/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Dialog from './Dialog';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

describe('Dialog', () => {
  test('renders a list with close button', () => {
    const mockFn = jest.fn();
    render(
      <Dialog
        visible
        title="Dialog"
        onCancelButtonClick={mockFn}
        onContinueButtonClick={mockFn}
      >
        Text
      </Dialog>,
    );

    const dialog = screen.getByTestId('dialog');

    expect(dialog).toBeDefined();
  });
});
