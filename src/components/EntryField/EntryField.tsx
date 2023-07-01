import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useRef,
  FocusEventHandler,
} from 'react';
import Box from '../Box/Box';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';
import {formatAmount} from '../../pages/Welcome/CoinList/CoinListHelper';
import Text from '../Text/Text';
import IconButton from '../IconButton/IconButton';
import {InputChangeEventHandler} from '../Input/InputHelper';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EntryFieldProps {
  value: any;
  onChange?: InputChangeEventHandler;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  location?: string;
}

const EntryField: FC<EntryFieldProps> = ({
  value: entryValue,
  onChange,
  onBlur,
  location = '',
}) => {
  const [entryEditMode, setEntryEditMode] = useState(false);

  const {
    form: {
      fieldName: {name, value, ref},
    },
    formFieldChangeHandler,
  } = useForm(`fieldName${entryValue && `-${entryValue}`}`);

  useEffect(() => {
    if (entryEditMode) ref?.current?.focus();
  }, [entryEditMode, ref]);

  return (
    <Box data-testid="entry-field" flex-row align-m spc-btw>
      {entryEditMode ? (
        <Input
          name={name}
          ref={ref}
          value={value}
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
          <Text font-sz={14}>
            {!Number.isNaN(parseFloat(value)) && location
              ? formatAmount(parseFloat(value), location)
              : value}
          </Text>
          <IconButton
            aria-label="edit-button"
            mh={8}
            type="edit"
            iconSize={16}
            onClick={() => {
              setEntryEditMode(true);
              formFieldChangeHandler({name, value});
            }}
          />
        </>
      )}
    </Box>
  );
};

export default EntryField;
