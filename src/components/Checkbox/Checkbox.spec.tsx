/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Checkbox from './Checkbox';

const mockChangeHandler = jest.fn();

describe('Checkbox', () => {
  test('renders an unchecked input by default', () => {
    render(<Checkbox name="test-mode" onChange={mockChangeHandler} />);

    const checkboxElement = screen.getByTestId('checkbox-element');

    expect(checkboxElement).toHaveAttribute('id', 'test-mode');
    expect(checkboxElement).not.toBeChecked();
  });

  test('renders a checked input when set to checked', () => {
    render(<Checkbox name="test-mode" checked onChange={mockChangeHandler} />);

    const checkboxElement = screen.getByTestId('checkbox-element');

    expect(checkboxElement).toBeChecked();
  });

  test('renders an input with label', () => {
    render(
      <Checkbox
        label="Test Mode"
        name="test-mode"
        onChange={mockChangeHandler}
      />,
    );

    const checkboxLabel = screen.getByTestId('checkbox-label');
    const checkboxElement = screen.getByTestId('checkbox-element');

    expect(checkboxLabel).toHaveTextContent('Test Mode');
    expect(checkboxElement).toBeInTheDocument();
  });

  test('renders an input as a switch', () => {
    render(
      <Checkbox
        label="Test Mode"
        name="test-mode"
        as-switch
        onChange={mockChangeHandler}
      />,
    );

    const checkboxLabel = screen.getByTestId('checkbox-label');

    expect(checkboxLabel).toHaveClass('checkbox as-switch');
  });

  test('calls change handler', async () => {
    const user = userEvent.setup();

    render(<Checkbox name="test-mode" onChange={mockChangeHandler} />);

    const checkboxElement = screen.getByTestId('checkbox-element');

    await user.click(checkboxElement);

    expect(mockChangeHandler).toHaveBeenCalled();
  });

  test('does not call change handler when disabled', async () => {
    const user = userEvent.setup();
    const mockChangeHandler = jest.fn();

    render(<Checkbox name="test-mode" disabled onChange={mockChangeHandler} />);

    const checkboxElement = screen.getByTestId('checkbox-element');

    await user.click(checkboxElement);

    expect(mockChangeHandler).not.toHaveBeenCalled();
  });
});
