/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Button from './Button';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Button', () => {
  test('renders a div with text', () => {
    render(<Button>Text</Button>);

    expect(screen.getByText('Text'));
  });

  test('calls click handler', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    render(<Button onClick={mockClickHandler}>Click me!</Button>);
    await user.click(screen.getByRole('button', {name: /Click me!/i}));

    expect(mockClickHandler).toHaveBeenCalled();
  });

  test('does not call click handler when disabled', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    render(
      <Button disabled onClick={mockClickHandler}>
        Click me!
      </Button>,
    );
    await user.click(screen.getByRole('button', {name: /Click me!/i}));

    expect(mockClickHandler).not.toHaveBeenCalled();
  });

  test('should navigate to about page', async () => {
    const user = userEvent.setup();

    render(
      <Button isLink to="/about">
        Click me!
      </Button>,
    );
    await user.click(screen.getByRole('button', {name: /Click me!/i}));

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
