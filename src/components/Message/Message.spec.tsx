/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

import Message from './Message';

describe('Message', () => {
  test('renders a message with text', () => {
    render(<Message>Info message</Message>);

    expect(screen.getByRole('alert')).toHaveTextContent('Info message');
  });

  test('renders a message with an  heading element', () => {
    render(
      <Message type="success">
        <h1>Title</h1>
      </Message>,
    );

    expect(screen.getByRole('heading', {name: 'Title'}));
  });

  test('renders a message with a localised paragraph', () => {
    render(<Message type="error" tKey="common:message:error:text" />);

    expect(screen.getByText(/error/));
  });
});
