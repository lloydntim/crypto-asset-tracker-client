import React, { FC, ReactElement } from 'react';

import DataList, { DataListProps } from '../DataList/DataList';

import './AutoComplete.scss';

interface AutoCompleteProps extends DataListProps {
  value: string;
}

export const highlightTextSection = (text: string, inputValueLength: number) => ({
  boldText: text.substring(0, inputValueLength),
  normalText: text.substring(inputValueLength),
});

const AutoComplete: FC<AutoCompleteProps> = ({
  items,
  value,
  onListItemClick,
}) => {
  const filteredItems = items
    .filter(
      (item) => value.length && item.text.toLowerCase().startsWith(value.toLowerCase())
    );

  return (
    <DataList
      name="autocomplete"
      items={filteredItems}
      renderListItem={
        ({ item }): ReactElement => {
          const { normalText, boldText } = highlightTextSection(item.text, value.length);

          return (
            <button
              type="button"
              className="auto-complete-item-button"
              onClick={() => onListItemClick(item)}
            >
              <span>{boldText}</span>
              {normalText && <span>{normalText}</span>}
            </button>
          )
        }
      }
    />
  );
};

export default AutoComplete;
