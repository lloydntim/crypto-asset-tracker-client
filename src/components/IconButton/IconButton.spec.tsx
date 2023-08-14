/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import IconButton from './IconButton';

const mockNavigate = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('IconButton', () => {
  test('renders a button with an icon', () => {
    render(<IconButton type="menu" />);

    const iconButton = screen.getByLabelText('icon-button');

    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass('icon-type-menu');
  });

  test('calls click handler', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    render(<IconButton type="menu" onClick={mockClickHandler} />);

    const iconButton = screen.getByLabelText('icon-button');

    await user.click(iconButton);

    expect(mockClickHandler).toHaveBeenCalled();
  });

  test('does not call click handler when disabled', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    render(<IconButton type="menu" disabled onClick={mockClickHandler} />);

    const iconButton = screen.getByLabelText('icon-button');

    await user.click(iconButton);

    expect(mockClickHandler).not.toHaveBeenCalled();
  });

  test('should navigate to about page', async () => {
    const user = userEvent.setup();

    render(<IconButton type="menu" isLink to="/about" />);

    const iconButton = screen.getByTestId('icon-button-menu');

    await user.click(iconButton);

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
