/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Input from './Input';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const dataListData = [
  {text: 'Sample', value: '0'},
  {text: 'Title 1', value: '1'},
  {text: 'Title 2', value: '2'},
  {text: 'Title 3', value: '3'},
  {text: 'Unrelated', value: '4'},
];

describe('Input', () => {
  test('renders custom error message when required', async () => {
    const user = userEvent.setup();
    const mockChangeHandler = jest.fn();

    render(
      <Input
        required
        requiredErrorMessage="Please do not leave empty text"
        onChange={mockChangeHandler}
      />,
    );

    const input = screen.getByLabelText('core-input');

    await user.type(input, '1{backspace}');
    await user.tab();

    const errorMessage = await screen.findByText(/Please do not/i);

    expect(input).toHaveValue('');
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders an entry with text', async () => {
    const user = userEvent.setup();
    render(<Input defaultValue="1" />);

    const input = screen.getByTestId('input');

    await user.type(input, '23');

    expect(input).toHaveValue('123');
  });

  test('renders a entry with text and clears it', async () => {
    const user = userEvent.setup();
    const {rerender, getByTestId, getByLabelText} = render(
      <Input value="Some text to be cleared" />,
    );

    const clearButton = getByTestId('icon-button-close');

    await user.click(clearButton);

    rerender(<Input value="" />);

    const input = getByLabelText('core-input');

    expect(input).toHaveValue('');
  });

  test("renders a input with datalist and filters the correct items based on the input's value", async () => {
    const user = userEvent.setup();
    const mockDataListClickHandler = jest.fn();

    const {rerender} = render(
      <Input
        value=""
        dataList={dataListData}
        onDataListClick={mockDataListClickHandler}
      />,
    );

    const input = screen.getByLabelText('core-input');

    await user.type(input, 'Title');

    rerender(
      <Input
        value="Title"
        dataList={dataListData}
        onDataListClick={mockDataListClickHandler}
      />,
    );

    expect(screen.getAllByRole('button', {name: /Title/i})).toHaveLength(3);
    expect(
      screen.queryByRole('button', {name: /Unrelated/i}),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', {name: /Sample/i}),
    ).not.toBeInTheDocument();
  });

  test('renders an input with datalist and updates the input value with list item text when when clicked', async () => {
    const user = userEvent.setup();
    const mockDataListClickHandler = jest.fn();

    const {rerender} = render(
      <Input
        value="Sample"
        dataList={dataListData}
        onDataListClick={mockDataListClickHandler}
      />,
    );

    const input = screen.getByLabelText('core-input');

    await user.type(input, 'Sample');

    rerender(
      <Input
        value="Sample"
        dataList={dataListData}
        onDataListClick={mockDataListClickHandler}
      />,
    );

    const selectedListItem = screen.getByRole('button', {name: /Sample/i});

    await user.click(selectedListItem);

    expect(mockDataListClickHandler).toHaveBeenCalled();
    expect(input).toHaveDisplayValue('Sample');
  });
});
