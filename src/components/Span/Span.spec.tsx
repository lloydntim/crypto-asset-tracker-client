/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Span from './Span';
import Text from '../Text/Text';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Span', () => {
  test('renders a span with text', () => {
    render(
      <Span>
        <Text>Text</Text>
      </Span>,
    );

    expect(screen.getByText('Text'));
  });
});
