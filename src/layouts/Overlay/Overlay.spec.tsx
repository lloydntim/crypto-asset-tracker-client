/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Overlay from './Overlay';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

const mockCloseButtonClickHandler = jest.fn();

describe('Overlay', () => {
  test('renders an overlay with close button', () => {
    render(
      <Overlay visible onCloseButtonClick={mockCloseButtonClickHandler}>
        Content
      </Overlay>,
    );

    const overlay = screen.getByTestId('overlay');

    expect(overlay).toHaveTextContent('Content');
  });

  test('renders an overlay with title', () => {
    render(
      <Overlay
        visible
        title="Overlay Title"
        onCloseButtonClick={mockCloseButtonClickHandler}
      >
        Content
      </Overlay>,
    );

    const overlay = screen.getByTestId('overlay');

    expect(overlay).toHaveTextContent('Overlay');
  });

  test('renders no overlay when not visible', () => {
    render(
      <Overlay
        visible={false}
        title="Overlay Title"
        onCloseButtonClick={mockCloseButtonClickHandler}
      >
        Content
      </Overlay>,
    );

    const overlay = screen.queryByTestId('overlay');

    expect(overlay).not.toBeInTheDocument();
  });

  test('calls close button handler when close button is clicked', () => {
    const user = userEvent.setup();
    render(
      <Overlay
        visible
        title="Overlay Title"
        onCloseButtonClick={mockCloseButtonClickHandler}
      >
        Content
      </Overlay>,
    );

    const overlayTitle = screen.getByText('Overlay Title');

    expect(overlayTitle).toBeInTheDocument();
  });

  test('calls close button handler when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Overlay
        visible
        title="Overlay"
        onCloseButtonClick={mockCloseButtonClickHandler}
      >
        Content
      </Overlay>,
    );

    const closeButton = screen.getByLabelText('close-button');

    await user.click(closeButton);

    expect(mockCloseButtonClickHandler).toHaveBeenCalled();
  });
});
