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
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => null,
  },
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

    const {rerender} = render(
      <EntryField
        value="Edit me"
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
      />,
    );

    const editButton = screen.getByLabelText('edit-button');

    await user.click(editButton);

    const entryFieldInput = await screen.findByDisplayValue('Edit me');

    await user.type(entryFieldInput, '{backspace}{backspace}{backspace}ed');
    await user.tab();

    rerender(
      <EntryField
        value="Edited"
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
      />,
    );

    const entryField = await screen.findByText('Edited');

    expect(mockBlurHandler).toHaveBeenCalled();
    expect(entryField).toBeInTheDocument();
  });

  test('renders formatted static value', async () => {
    const user = userEvent.setup();

    const {rerender} = render(<EntryField value="2000000" location="en-GB" />);

    const formattedStaticValue = screen.getByText('2,000,000.00');

    expect(formattedStaticValue).toBeInTheDocument();

    const editButton = screen.getByLabelText('edit-button');

    await user.click(editButton);

    const entryFieldInput = await screen.findByDisplayValue('2000000');

    await user.type(entryFieldInput, '{backspace}{backspace}');
    await user.tab();

    rerender(<EntryField value="20000" location="en-GB" />);

    const entryField = await screen.findByText('20,000.00');

    expect(entryField).toBeInTheDocument();
  });
});
