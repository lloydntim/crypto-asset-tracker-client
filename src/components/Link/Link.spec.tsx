/**
 * @jest-environment jsdom
 */

import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Link from './Link';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Link', () => {
  test('renders a link with text', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Link to="/">Go here</Link>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('link'));
  });
});
