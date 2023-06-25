/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';
import Box from '../Box/Box';
import Text from '../Text/Text';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Header', () => {
  test('renders a header with text', () => {
    render(
      <Header>
        <Box>
          <Text>Text</Text>
        </Box>
      </Header>,
    );

    expect(screen.getByText('Text'));
  });
});
