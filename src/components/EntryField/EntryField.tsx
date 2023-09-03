import React, {useState, useEffect, FocusEventHandler} from 'react';
import Box from '../Box/Box';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';
import {formatAmount} from '../../pages/Portfolio/CoinList/CoinListHelper';
import Text from '../Text/Text';
import IconButton from '../IconButton/IconButton';
import {InputChangeEventHandler, InputProps} from '../Input/InputHelper';

interface EntryFieldProps extends InputProps {
  location?: string;
}

const EntryField = ({
  value: entryValue = '',
  onChange,
  onBlur,
  location = '',
  ...rest
}: EntryFieldProps) => {
  const [entryEditMode, setEntryEditMode] = useState(false);

  const {
    form: {
      fieldName: {name, value, ref},
    },
    formFieldChangeHandler,
  } = useForm('fieldName');

  useEffect(() => {
    if (entryEditMode) ref?.current?.focus();
  }, [entryEditMode, ref]);

  return (
    <Box data-testid="entry-field" $flex-row $align-m $spc-btw>
      {entryEditMode ? (
        <Input
          name={name}
          ref={ref}
          value={value}
          {...rest}
          onChange={(props) => {
            formFieldChangeHandler(props);
            if (onChange) onChange(props);
          }}
          onBlur={(props) => {
            setEntryEditMode(false);
            if (onBlur) onBlur(props);
          }}
        />
      ) : (
        <>
          <Text $font-sz={14}>
            {!Number.isNaN(parseFloat(entryValue)) && location
              ? formatAmount(parseFloat(entryValue), location)
              : entryValue}
          </Text>
          <IconButton
            aria-label="edit-button"
            $mh={8}
            type="edit"
            iconSize={16}
            onClick={() => {
              setEntryEditMode(true);
              formFieldChangeHandler({name, value: entryValue});
            }}
          />
        </>
      )}
    </Box>
  );
};

export default EntryField;
