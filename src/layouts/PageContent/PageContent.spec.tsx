/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import PageContent from './PageContent';
import {AuthenticationProvider} from '../../providers';
import {BrowserRouter} from 'react-router-dom';

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

describe('PageContent', () => {
  test('renders title content, logo and footer', () => {
    render(
      <AuthenticationProvider>
        <PageContent title="Title Text">Content</PageContent>
      </AuthenticationProvider>,
      {wrapper: BrowserRouter},
    );

    expect(screen.getByText('Title Text'));
    expect(screen.getByText('Content'));
    expect(screen.getByTestId('icon-logo'));
    expect(screen.getByText(/All rights reserved/));
  });

  test('renders logo with text when authorised view is selected', () => {
    render(
      <AuthenticationProvider>
        <PageContent isAuthorised>Content</PageContent>
      </AuthenticationProvider>,
      {wrapper: BrowserRouter},
    );

    expect(screen.getByText('CryptoAssetTracker'));
    expect(screen.getByText(/All rights reserved/));
  });
});
