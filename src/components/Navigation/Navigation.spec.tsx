/**
 * @jest-environment jsdom
 */

import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Navigation from './Navigation';
import AuthenticationProvider from '../../providers/AuthenticationProvider';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {changeLanguage: jest.fn(), language: 'en'},
  }),
}));

describe('Navigation', () => {
  test('renders a list with close button', () => {
    render(
      <AuthenticationProvider>
        <Navigation />,
      </AuthenticationProvider>,
      {wrapper: BrowserRouter},
    );

    const nav = screen.getByTestId('main-nav');
    // const items = screen.getAllByTestId('list-item');

    expect(nav).toBeDefined();
    // expect(items).toHaveLength(3);
  });
});
