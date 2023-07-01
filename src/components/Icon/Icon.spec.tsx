/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from './Icon';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Icon', () => {
  test('renders the menu icon', () => {
    render(<Icon type="menu" />);

    expect(screen.getByTestId('icon-menu')).toBeInTheDocument();
  });
  test('renders the close icon', () => {
    render(<Icon type="close" />);

    expect(screen.getByTestId('icon-close')).toBeInTheDocument();
  });

  test('renders the close icon', () => {
    render(<Icon type="icon-does-not-exist" />);

    expect(screen.queryByTestId('icon-does-not-exist')).not.toBeInTheDocument();
  });
});
