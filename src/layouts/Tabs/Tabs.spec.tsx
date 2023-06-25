/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Tabs from './Tabs';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({navigate: jest.fn()}),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('Tabs', () => {
  test('renders two tabs and only first content section by default', () => {
    render(
      <Tabs titles={['Tab Title 1', 'Tab Title 2']}>
        <Box>
          <Text>Content for tab 1</Text>
        </Box>
        <Box>
          <Text>Content for tab 2</Text>
        </Box>
      </Tabs>,
    );

    const tabTitles = screen.getAllByRole('button', {name: /Tab Title/i});
    const firstTabContentSection = screen.getByText('Content for tab 1');
    const secondTabContentSection = screen.queryByText('Content for tab 2');

    expect(firstTabContentSection).toBeInTheDocument();
    expect(secondTabContentSection).not.toBeInTheDocument();
    expect(tabTitles).toHaveLength(2);
  });

  test('renders two tabs and only first content section by default', () => {
    render(
      <Tabs titles={['Tab Title 1', 'Tab Title 2']}>
        <Box>
          <Text>Content for tab 1</Text>
        </Box>
        <Box>
          <Text>Content for tab 2</Text>
        </Box>
      </Tabs>,
    );

    const tabs = screen.getAllByRole('button', {name: /Tab Title/i});
    const firstTabContentSection = screen.getByText('Content for tab 1');
    const secondTabContentSection = screen.queryByText('Content for tab 2');

    expect(firstTabContentSection).toBeInTheDocument();
    expect(secondTabContentSection).not.toBeInTheDocument();
    expect(tabs).toHaveLength(2);
  });

  test('renders two tabs and the second content section when second title is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Tabs titles={['Tab Title 1', 'Tab Title 2']}>
        <Box>
          <Text>Content for tab 1</Text>
        </Box>
        <Box>
          <Text>Content for tab 2</Text>
        </Box>
      </Tabs>,
    );

    const tab2 = screen.getByRole('button', {name: /Tab Title 2/i});

    await user.click(tab2);

    const firstTabContentSection = screen.queryByText('Content for tab 1');
    const secondTabContentSection = screen.getByText('Content for tab 2');

    expect(firstTabContentSection).not.toBeInTheDocument();
    expect(secondTabContentSection).toBeInTheDocument();
  });

  test('calls tab click handler second title is clicked and returns the index', async () => {
    const user = userEvent.setup();
    const mockTabClickHandler = jest.fn();

    render(
      <Tabs
        titles={['Tab Title 1', 'Tab Title 2']}
        onTabClick={mockTabClickHandler}
      >
        <Box>
          <Text>Content for tab 1</Text>
        </Box>
        <Box>
          <Text>Content for tab 2</Text>
        </Box>
      </Tabs>,
    );

    const tab2 = screen.getByRole('button', {name: /Tab Title 2/i});

    await user.click(tab2);

    expect(mockTabClickHandler).toHaveBeenCalledWith(1);
  });

  test('does not call tab click handler when title is selected', async () => {
    const user = userEvent.setup();
    const mockTabClickHandler = jest.fn();

    render(
      <Tabs
        titles={['Tab Title 1', 'Tab Title 2']}
        onTabClick={mockTabClickHandler}
      >
        <Box>
          <Text>Content for tab 1</Text>
        </Box>
        <Box>
          <Text>Content for tab 2</Text>
        </Box>
      </Tabs>,
    );

    const tab1 = screen.getByRole('button', {name: /Tab Title 1/i});

    await user.click(tab1);

    expect(mockTabClickHandler).not.toHaveBeenCalled();
  });
});
