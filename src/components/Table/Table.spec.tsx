/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Table, {TableRow, TableCell} from './';
import Text from '../Text/Text';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Table', () => {
  test('renders a header with text', () => {
    render(
      <Table>
        <TableRow>
          <TableCell $valign-m $col-w={140} $txt-align-l>
            <Text>Description</Text>
          </TableCell>
          <TableCell $valign-m $col-w={120} $txt-align-r>
            <Text>This a random text</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );

    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
