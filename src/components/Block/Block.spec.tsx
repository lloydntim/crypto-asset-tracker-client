/**
 * @jest-environment jsdom
 */

import React from 'react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Block from './Block';
import AuthenticationProvider from '../../providers/AuthenticationProvider';

/* jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Block', () => {
  test('renders a list with close button', () => {
    render(
      // <MemoryRouter initialEntries={['/']}>
      <AuthenticationProvider>
        <Block />,
      </AuthenticationProvider>,
      // </MemoryRouter>,
      {wrapper: BrowserRouter},
    );

    const nav = screen.getByTestId('main-nav');
    // const items = screen.getAllByTestId('list-item');

    expect(nav).toBeDefined();
    // expect(items).toHaveLength(3);
  });
});
