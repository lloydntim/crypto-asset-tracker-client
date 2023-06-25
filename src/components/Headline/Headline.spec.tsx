/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Headline from './Headline';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Headline', () => {
  test('renders a div with text', () => {
    render(<Headline>Text</Headline>);

    expect(screen.getByRole('heading')).toHaveTextContent('Text');
  });

  test('renders a message with a localised paragraph', () => {
    render(<Headline tKey="test:localised.text" />);

    expect(screen.getByText(/localised/));
  });
});
