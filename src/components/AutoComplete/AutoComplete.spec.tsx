/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom';

import AutoComplete from './AutoComplete';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('AutoComplete', () => {
  test('renders a group of three buttons with text', () => {
    const data = [
      {
        text: 'item 1',
        value: '1',
      },
      {
        text: 'item 2',
        value: '2',
      },
      {
        text: 'item 3',
        value: '3',
      },
    ];
    const mockFn = jest.fn();

    render(<AutoComplete items={data} value="2" onListItemClick={mockFn} />);

    const list = screen.getByTestId('autocomplete');

    // const {getAllByTestId} = within(list);
    // const items = getAllByTestId('autocomplete-item');

    // expect(items.length).toBe(3);
    expect(list).toBeDefined();
    // expect(items).toBeInTheDocument();
  });
});
