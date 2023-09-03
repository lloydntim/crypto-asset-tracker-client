/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../locales/i18n';

describe('Footer', () => {
  test('renders with company name', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Footer startYear={2019} companyName="LNCD" />
      </I18nextProvider>,
    );

    expect(screen.getByText(/LNCD/));
  });

  test('renders with current year 2023 by default', () => {
    render(<Footer companyName="LNCD" />);

    expect(screen.getByText(/2023/));
  });

  test('renders with current year 2023 when set current year', () => {
    render(<Footer companyName="LNCD" startYear={2023} />);

    expect(screen.getByText(/2023/));
  });

  test('renders with start and current year', () => {
    render(<Footer startYear={2019} companyName="LNCD" />);

    expect(screen.getByText(/2019/));
    expect(screen.getByText(/2023/));
  });

  test('renders with `All rights reserved` text', () => {
    render(<Footer startYear={2019} companyName="LNCD" />);

    expect(screen.getByText(/All rights reserved/));
  });
});
