/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Form from './Form';
import Button from '../Button/Button';
// import Input from '../Input/Input';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Form', () => {
  test('renders a div with text', () => {
    const mockClickHandler = jest.fn();
    // const mockChangeHandler = jest.fn();

    render(
      <Form>
        {/*  <Input
          name="test"
          label="Label"
          placeholder="Enter text"
          value=""
          onChange={mockChangeHandler}
        /> */}
        <Button onClick={mockClickHandler}>Submit</Button>
      </Form>,
    );

    // expect(screen.getByTestId(/input/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });
});
