/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Radios from './Radios';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

describe('Radios', () => {
  test('renders set of inputs with first item as checked by default', () => {
    const data = [
      {value: '1', label: 'Label 1'},
      {value: '2', label: 'Label 2'},
      {value: '3', label: 'Label 3'},
    ];

    const mockChangeHandler = jest.fn();

    render(<Radios items={data} onChange={mockChangeHandler} />);

    const firstRadio = screen.getByDisplayValue('1');
    const radios = screen.getAllByLabelText(/Label/i);

    expect(firstRadio).toBeChecked();
    expect(radios).toHaveLength(3);
  });

  test('renders three radio buttons when set to isButton and the first item checked by default', () => {
    const data = [
      {value: '1', label: 'Label 1'},
      {value: '2', label: 'Label 2'},
      {value: '3', label: 'Label 3'},
    ];

    const mockChangeHandler = jest.fn();

    render(<Radios isButton items={data} onChange={mockChangeHandler} />);

    const firstRadio = screen.getByDisplayValue('1');
    const radioButtons = screen.getAllByLabelText(/Label/i);

    expect(radioButtons).toHaveLength(3);
    expect(firstRadio).toBeChecked();
  });

  test('renders three radio buttons with second one checked', () => {
    const data = [
      {value: '1', label: 'Label 1'},
      {value: '2', label: 'Label 2'},
      {value: '3', label: 'Label 3'},
    ];

    const mockChangeHandler = jest.fn();

    render(
      <Radios
        isButton
        items={data}
        selectedItem={1}
        onChange={mockChangeHandler}
      />,
    );

    const firstRadio = screen.getByDisplayValue('1');
    const secondRadio = screen.getByDisplayValue('2');

    expect(firstRadio).not.toBeChecked();
    expect(secondRadio).toBeChecked();
  });

  test('renders three radio buttons with second one checked', () => {
    const data = [
      {value: '1', label: 'Label 1'},
      {value: '2', label: 'Label 2'},
      {value: '3', label: 'Label 3'},
    ];

    const mockChangeHandler = jest.fn();

    render(
      <Radios
        isButton
        items={data}
        selectedItem={1}
        onChange={mockChangeHandler}
      />,
    );

    const firstRadio = screen.getByDisplayValue('1');
    const secondRadio = screen.getByDisplayValue('2');

    expect(firstRadio).not.toBeChecked();
    expect(secondRadio).toBeChecked();
  });

  test('renders three radio buttons with second one checked', async () => {
    const user = userEvent.setup();
    const data = [
      {value: '1', label: 'Label 1'},
      {value: '2', label: 'Label 2'},
      {value: '3', label: 'Label 3'},
    ];

    const mockChangeHandler = jest.fn();

    render(<Radios isButton items={data} onChange={mockChangeHandler} />);

    const thirdRadioButtonLabel = screen.getByLabelText(/Label 3/i);

    await user.click(thirdRadioButtonLabel);

    expect(mockChangeHandler).toHaveBeenCalled();

    const firstRadio = await screen.findByDisplayValue('1');
    const thirdRadio = await screen.findByDisplayValue('3');

    expect(firstRadio).not.toBeChecked();
    expect(thirdRadio).toBeChecked();
  });
});
