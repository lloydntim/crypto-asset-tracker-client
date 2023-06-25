/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import InputField from './InputField';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: mockNavigate,
}));

describe('InputField', () => {
  test('renders an empty input', () => {
    const mockChangeHandler = jest.fn();

    render(<InputField onChange={mockChangeHandler} />);

    const inputField = screen.getByLabelText('core-input');
    expect(inputField).toBeInTheDocument();
  });

  test('renders a entry with text', async () => {
    const user = userEvent.setup();
    render(<InputField />);

    const input = screen.getByLabelText('core-input');

    await user.type(input, '23');

    expect(input).toHaveValue('23');
  });
});
