import React, {FocusEvent, forwardRef, useState} from 'react';

import AutoComplete from '../../components/AutoComplete/AutoComplete';
import IconButton from '../../components/IconButton/IconButton';
import Message from '../../components/Message/Message';
import Box from '../../components/Box/Box';
import InputField from '../../components/InputField/InputField';
import Span from '../../components/Span/Span';
import Text from '../../components/Text/Text';

import {GRAPE_DARK, TRANSPARENT, WHITE} from '../../constants/colors';
import Label from '../Label/Label';
import {
  validateInput,
  InputProps,
  InputValidationMessage,
  validationMessageDefaultProps,
} from './InputHelper';

/* eslint-disable react/jsx-props-no-spreading, react/display-name */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label = '',
    labelTKey = '',
    labelColor = WHITE,
    autoComplete,
    autoCapitalize,
    name,
    type = 'text',
    tabIndex,
    placeholder = '',
    placeholderTKey,
    defaultValue,
    value,
    required,
    onChange,
    onFocus,
    onBlur,
    dataList = [],
    onDataListClick,
    $m,
    $mv,
    $mh,
    $bw = 1,
  } = props;
  const isTypePassword = type === 'password';
  const [dynamicInputType, setDynamicInputType] = useState(type);
  const [isDataListVisible, setIsDataListVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState<InputValidationMessage>(
    validationMessageDefaultProps,
  );
  const validationProps = {...props, type: dynamicInputType};
  const labelText = label || labelTKey;

  return (
    <Label
      className={`input input-type-${dynamicInputType} input-is-${
        inputMessage?.type !== 'error' ? 'valid' : 'invalid'
      }`}
      htmlFor={name}
      $pos-rel
      $w="100%"
      $m={$m}
      $mh={$mh}
      $mv={$mv}
      $bcolor={GRAPE_DARK}
    >
      {labelText && (
        <Span $mv={8} $flex-row className="input-label" $color={labelColor}>
          <Text tKey={labelText} $m={0} />
        </Span>
      )}
      <Box
        $flex-row
        $w="100%"
        $pos-rel
        $bgcolor={WHITE}
        $bcolor={GRAPE_DARK}
        $mh={0}
        $br={8}
      >
        <InputField
          data-testid="input"
          $flex="1"
          $w="100%"
          $flex-row
          $m={0}
          $pr={32}
          $pl={12}
          $bcolor={TRANSPARENT}
          $bw={$bw}
          ref={ref}
          required={required}
          className="input-element"
          autoComplete={dataList.length ? 'off' : autoComplete}
          autoCapitalize={autoCapitalize}
          tabIndex={tabIndex}
          name={name}
          type={dynamicInputType}
          placeholderTKey={placeholderTKey}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={({target: {value, files = null}}) => {
            if (!dataList.length) setInputMessage({text: '', type: 'error'});
            const error = validateInput({value, files}, validationProps);

            if (files) setInputMessage({text: files[0].name, type: 'info'});
            if (onChange) onChange({name, value, files, error, required});
          }}
          onFocus={(event: FocusEvent<HTMLInputElement, Element>) => {
            if (dataList?.length) setIsDataListVisible(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
            const {
              target: {value, files},
            } = event;

            if (onBlur) onBlur(event);

            if (!dataList?.length) setIsDataListVisible(false);

            const error = validateInput({value, files}, validationProps);
            setInputMessage({text: error, type: 'error'});
          }}
        />

        {(isTypePassword || (value && value.length)) && (
          <IconButton
            $bgcolor={TRANSPARENT}
            iconSize={14}
            $align-m
            $pos-abs
            $pos-r={4}
            $pos-t={isTypePassword ? 2 : 6}
            $flex-row
            type={isTypePassword ? 'view' : 'close'}
            tabIndex={-1}
            onClick={() => {
              if (isTypePassword) {
                return setDynamicInputType(
                  dynamicInputType === 'password' ? 'text' : 'password',
                );
              }
              if (onChange) {
                setInputMessage(validationMessageDefaultProps);
                onChange({name, value: ''});
              }
            }}
          />
        )}
        {/* {type === 'search' && <Icon type="search" />} */}
      </Box>
      {isDataListVisible && (
        <AutoComplete
          items={dataList}
          value={value}
          onListItemClick={(item) => {
            const error = validateInput({value: item.text}, validationProps);

            setInputMessage({text: error, type: 'error'});
            if (onChange) onChange({name, value: item.text, error, required});
            if (onDataListClick) onDataListClick(item);

            setIsDataListVisible(false);
          }}
        />
      )}

      <Message $mv={8} type={inputMessage.type}>
        {inputMessage.text}
      </Message>
    </Label>
  );
});

export default Input;
