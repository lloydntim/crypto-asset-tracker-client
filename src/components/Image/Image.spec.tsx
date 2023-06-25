/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Image from './Image';

describe('Image', () => {
  test('renders a image with alt text', () => {
    render(<Image src="https://picsum.photos/200/300" alt="Test Image" />);

    expect(screen.getByAltText('Test Image'));
  });
});
