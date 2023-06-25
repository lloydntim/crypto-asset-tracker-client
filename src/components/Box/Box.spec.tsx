/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Box from './Box';

describe('Box', () => {
  test('renders a div with text', () => {
    render(<Box>Text</Box>);

    expect(screen.getByText('Text'));
  });
});
