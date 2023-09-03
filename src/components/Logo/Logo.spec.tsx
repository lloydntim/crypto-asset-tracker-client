/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Logo from './Logo';

describe('Logo', () => {
  test('renders Logo', () => {
    render(<Logo />);

    expect(screen.getByTestId('icon-logo')).toBeInTheDocument();
    expect(screen.queryByText('Crypto Asset Tracker')).not.toBeInTheDocument();
  });

  test('renders Logo with test ', () => {
    render(<Logo showText />);

    expect(screen.getByTestId('icon-logo')).toBeInTheDocument();
    expect(screen.getByText('Crypto Asset Tracker')).toBeInTheDocument();
  });
});
