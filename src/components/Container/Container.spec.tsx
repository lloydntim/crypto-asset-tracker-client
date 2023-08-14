/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Container from './Container';

describe('Container', () => {
  test('renders a div with text', () => {
    render(<Container>Text</Container>);

    expect(screen.getByText('Text'));
  });
});
