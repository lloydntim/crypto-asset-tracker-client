/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import EntryField from './EntryField';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('EntryField', () => {
  test('renders a entry with text and edit button', () => {
    const mockChangeHandler = jest.fn();

    render(<EntryField value="Edit me" onChange={mockChangeHandler} />);

    const entryField = screen.getByText('Edit me');
    const editButton = screen.getByLabelText('edit-button');

    expect(entryField).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test('renders a entry input when button is clicked', async () => {
    const mockChangeHandler = jest.fn();
    const user = userEvent.setup();

    render(<EntryField value="Edit me" onChange={mockChangeHandler} />);

    const editButton = screen.getByLabelText('edit-button');

    await user.click(editButton);

    const entryFieldInput = screen.getByDisplayValue('Edit me');
    const entryField = screen.queryByText('Edit me');

    expect(entryFieldInput).toBeInTheDocument();
    expect(entryField).not.toBeInTheDocument();
  });

  test('renders updated test after entering new value', async () => {
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();
    const user = userEvent.setup();

    render(
      <EntryField
        value="Edit me"
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
      />,
    );

    const editButton = screen.getByLabelText('edit-button');

    await user.click(editButton);

    const entryFieldInput = screen.getByDisplayValue(
      'Edit me',
    ) as HTMLInputElement;

    await user.type(entryFieldInput, '{backspace}{backspace}{backspace}ed');
    await user.tab();

    const entryField = screen.getByText('Edited');

    expect(mockBlurHandler).toHaveBeenCalled();
    expect(entryField).toBeInTheDocument();
  });

  test('renders formatted static value', async () => {
    const user = userEvent.setup();

    const mockChangeHandler = jest.fn();

    render(
      <EntryField
        value={2000000}
        location="en-GB"
        onChange={mockChangeHandler}
      />,
    );

    const formattedStaticValue = screen.getByText('2,000,000.00');

    expect(formattedStaticValue).toBeInTheDocument();

    const editButton = screen.getByLabelText('edit-button');

    await user.click(editButton);

    const entryFieldInput = screen.getByDisplayValue(
      '2000000',
    ) as HTMLInputElement;

    await user.type(entryFieldInput, '{backspace}{backspace}');
    await user.tab();

    const entryField = screen.getByText('20,000.00');

    expect(entryField).toBeInTheDocument();
  });
});
