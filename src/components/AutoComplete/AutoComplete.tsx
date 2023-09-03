import React from 'react';

import List, {RenderItem} from '../List/List';
import Span from '../Span/Span';
import Button from '../Button/Button';

import {
  GRAPE_DARK,
  GRAPE_EXTRA_LIGHT,
  TRANSPARENT,
} from '../../constants/colors';
import {DataListItem as AutoCompleteItem} from '../Input/InputHelper';

interface AutoCompleteProps {
  value: string | undefined;
  items: AutoCompleteItem[];
  // Uses (onMouseDown) instead of onClick to avoid parents onBlur event being called before click event happens
  // see ref: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
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
        $br={0}
        $h="100%"
        $pv={12}
        $ph="10%"
        $color={GRAPE_DARK}
        $align-l
        $align-c={false}
        $bgcolor={TRANSPARENT}
        type="button"
        data-testid="autocomplete-item"
        className="autocomplete-item-button"
        onMouseDown={() => onListItemClick(item)}
      >
        <Span $font-wgt={700}>{boldText}</Span>
        {normalText && <Span>{normalText}</Span>}
      </Button>
    );
  };

  return (
    <List<AutoCompleteItem>
      $pos-abs
      $pos-t={24}
      $lst-stl="none"
      $flex-col
      $p={0}
      $bgcolor={GRAPE_EXTRA_LIGHT}
      $w="100%"
      data-testid="autocomplete"
      className="autocomplete"
      data={filteredItems}
      renderItem={renderItem}
    />
  );
};

export default AutoComplete;
