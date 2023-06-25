/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';

import Page from './Page';

describe('Page', () => {
  test('renders page with text', () => {
    render(<Page name="test">Content</Page>);

    const page = screen.getByText('Content');

    expect(page).toBeInTheDocument();
  });
});
