/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Body from './Body';

describe('Body', () => {
  test('renders a div with text', () => {
    render(
      <Body>
        <div>Text</div>
      </Body>,
    );

    expect(screen.getByRole('section')).toHaveTextContent('Text');
  });
});
