import React from 'react';

import List, {RenderItem} from '../List/List';
import Span from '../Span/Span';
import Button from '../Button/Button';

import {GRAPE_DARK, WHITE} from '../../constants/colors';
import {DataListItem as AutoCompleteItem} from '../Input/InputHelper';

interface AutoCompleteProps {
  value: string | undefined;
  items: AutoCompleteItem[];
  onListItemClick: (item: AutoCompleteItem) => void;
}

export const highlightTextSection = (
  text: string,
  inputValueLength: number,
) => ({
  boldText: text.substring(0, inputValueLength),
  normalText: text.substring(inputValueLength),
});

const AutoComplete = ({
  items,
  value = '',
  onListItemClick,
}: AutoCompleteProps) => {
  const filteredItems = items.filter(
    (item) =>
      value.length && item.text.toLowerCase().startsWith(value.toLowerCase()),
  );

  const renderItem: RenderItem<AutoCompleteItem> = ({item, index}) => {
    const {normalText, boldText} = highlightTextSection(
      item.text,
      value.length,
    );
    return (
      <Button
        key={index}
        bgcolor={WHITE}
        br={0}
        w="100%"
        h="100%"
        p={12}
        color={GRAPE_DARK}
        align-l
        type="button"
        data-testid="autocomplete-item"
        className="autocomplete-item-button"
        onClick={() => onListItemClick(item)}
      >
        <Span font-wgt={700}>{boldText}</Span>
        {normalText && <Span>{normalText}</Span>}
      </Button>
    );
  };

  return (
    <List<AutoCompleteItem>
      pos-abs
      pos-t={44}
      w="100%"
      data-testid="autocomplete"
      className="autocomplete"
      data={filteredItems}
      renderItem={renderItem}
    />
  );
};

export default AutoComplete;
