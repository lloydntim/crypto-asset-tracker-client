/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from './Select';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

describe('Select', () => {
  test('renders first item of data array as default option ', () => {
    const data = [
      {value: '1', text: 'Item1'},
      {value: '2', text: 'Item2'},
      {value: '3', text: 'Item3'},
    ];

    const mockChangeHandler = jest.fn();

    render(<Select options={data} onChange={mockChangeHandler} />);

    const select = screen.getByRole('select');
    const options = screen.getByText('Item1');

    expect(select).toBeDefined();
    expect(options).toBeInTheDocument();
  });

  test('renders first item of data array as default option ', () => {
    const data = [
      {value: '1', text: 'Item1'},
      {value: '2', text: 'Item2'},
      {value: '3', text: 'Item3'},
    ];

    const mockChangeHandler = jest.fn();

    render(<Select options={data} onChange={mockChangeHandler} />);

    const select = screen.getByRole('select');
    const options = screen.getByText('Item1');

    expect(select).toBeDefined();
    expect(options).toBeInTheDocument();
  });
});
