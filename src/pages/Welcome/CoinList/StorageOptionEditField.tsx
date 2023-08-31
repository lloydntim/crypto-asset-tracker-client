import React, {FocusEventHandler} from 'react';
import {Box, EntryField, Text} from '../../../components';
import {formatAmount} from './CoinListHelper';
import {StyledProps} from '../../../helpers';

interface StorageOptionEditFieldProps extends StyledProps {
  editMode: boolean;
  location: string;
  value: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
}

const StorageOptionEditField = ({
  editMode,
  location,
  value,
  onBlur,
  ...rest
}: StorageOptionEditFieldProps) => {
  const staticValue = Number.isNaN(value)
    ? formatAmount(parseFloat(value), location)
    : value;

  return (
    <Box {...rest}>
      {editMode ? (
        <EntryField {...{location, value, onBlur, editMode}} />
      ) : (
        <Text $valign-m $font-sz={14}>
          {staticValue}
        </Text>
      )}
    </Box>
  );
};

export default StorageOptionEditField;
