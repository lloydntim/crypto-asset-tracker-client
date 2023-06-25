/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Aside from './Aside';

describe('Aside', () => {
  test('renders a side nav with text', () => {
    render(<Aside>Text</Aside>);

    expect(screen.getByText('Text'));
  });
});
