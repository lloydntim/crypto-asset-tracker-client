import React, {FocusEventHandler} from 'react';
import {Box, EntryField, Text} from '../../../components';
import {formatAmount} from './CoinListHelper';
import {StyledProps} from '../../../helpers';
import {InputProps} from '../../../components/Input/InputHelper';

interface CoinListHoldingInputProps extends InputProps, StyledProps {
  editMode: boolean;
  location: string;
}

const CoinListHoldingInput = ({
  editMode,
  location,
  value = '',
  onBlur,
  pattern,
  minLength,
  maxLength,
  patternErrorMessageTKey,
  ...rest
}: CoinListHoldingInputProps) => {
  const staticValue = Number.isNaN(value)
    ? formatAmount(parseFloat(value), location)
    : value;

  return (
    <Box {...rest}>
      {editMode ? (
        <EntryField
          {...{
            location,
            value,
            onBlur,
            pattern,
            minLength,
            maxLength,
            patternErrorMessageTKey,
            editMode,
          }}
        />
      ) : (
        <Text $valign-m $font-sz={14}>
          {staticValue}
        </Text>
      )}
    </Box>
  );
};

export default CoinListHoldingInput;
