import React, {FC, ReactElement} from 'react';

import DataList, {DataListItem, DataListProps} from '../DataList/DataList';
import {Span, Button} from '../../components';

// import './AutoComplete.scss';
import {GRAPE_DARK, WHITE} from '../../constants/Colors';

interface AutoCompleteProps extends DataListProps {
  value: string;
  onListItemClick: (item: DataListItem) => void;
}

export const highlightTextSection = (
  text: string,
  inputValueLength: number,
) => ({
  boldText: text.substring(0, inputValueLength),
  normalText: text.substring(inputValueLength),
});

const AutoComplete: FC<AutoCompleteProps> = ({
  items,
  value,
  onListItemClick,
}) => {
  const filteredItems = items.filter(
    (item) =>
      value.length && item.text.toLowerCase().startsWith(value.toLowerCase()),
  );

  return (
    <DataList
      pos-abs
      pos-t={44}
      w="100%"
      name="autocomplete"
      items={filteredItems}
      renderListItem={({item, index}): ReactElement => {
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
            className="auto-complete-item-button"
            onClick={() => onListItemClick(item)}
          >
            <Span font-wgt={700}>{boldText}</Span>
            {normalText && <Span>{normalText}</Span>}
          </Button>
        );
      }}
    />
  );
};

export default AutoComplete;
