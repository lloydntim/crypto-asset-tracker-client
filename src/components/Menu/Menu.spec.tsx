/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import '@testing-library/jest-dom';

import Menu from './Menu';
import Box from '../Box/Box';
import List, {RenderItem} from '../List/List';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Menu', () => {
  test('renders a list with close button', () => {
    const data = ['Item1', 'Item2', 'Item3'];

    const renderItem: RenderItem<string> = ({item, index}) => (
      <Box key={index} data-testid="list-item">
        {item}
      </Box>
    );

    const mockFn = jest.fn();
    render(
      <MemoryRouter>
        <Menu onCloseButtonClick={mockFn}>
          <List<string> data={data} renderItem={renderItem} />
        </Menu>
        ,
      </MemoryRouter>,
    );

    const menu = screen.getByTestId('menu');
    // const {getAllByTestId} = within(menu);
    // const items = getAllByTestId('list-item');
    const items = screen.getAllByTestId('list-item');

    // expect(items.length).toBe(3);
    expect(menu).toBeDefined();
    expect(items.length).toBe(3);
  });
});
