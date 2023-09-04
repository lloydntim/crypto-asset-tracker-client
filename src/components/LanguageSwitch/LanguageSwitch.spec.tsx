/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';

import LanguageSwitch from './LanguageSwitch';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {changeLanguage: jest.fn(), language: 'en'},
  }),
}));

describe('LanguageSwitch', () => {
  test('renders radio group with two language option', () => {
    render(<LanguageSwitch />);

    expect(screen.getByText(/common:label.language.en/));
    expect(screen.getByText(/common:label.language.de/));
  });
});
