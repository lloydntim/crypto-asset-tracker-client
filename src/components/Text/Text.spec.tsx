/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Text from './Text';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Text', () => {
  test('renders a paragrah with text', () => {
    render(<Text>Text</Text>);

    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  test('renders with a localised paragraph', () => {
    render(<Text tKey="test:localised.text" />);

    expect(screen.getByText(/localised/)).toBeInTheDocument();
  });
});
