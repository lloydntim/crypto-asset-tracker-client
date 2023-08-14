/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Label from './Label';

describe('Label', () => {
  test('renders a label with text', () => {
    render(<Label>Text</Label>);

    expect(screen.getByText('Text'));
  });
});
