/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import List, {RenderItem} from './List';
import Box from '../Box/Box';

describe('List', () => {
  test('renders a list of three items', () => {
    const data = ['Item1', 'Item2', 'Item3'];

    const renderItem: RenderItem<string> = ({item, index}) => (
      <Box key={index} data-testid="list-item">
        {item}
      </Box>
    );

    render(<List<string> data={data} renderItem={renderItem} />);

    const items = screen.getAllByTestId('list-item');
    const list = screen.getByRole('list');

    expect(list).toBeDefined();
    expect(items).toHaveLength(3);
  });
});
