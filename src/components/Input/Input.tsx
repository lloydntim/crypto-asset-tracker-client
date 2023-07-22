import React, {FC, forwardRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import AutoComplete from '../../components/AutoComplete/AutoComplete';
import IconButton from '../../components/IconButton/IconButton';
import Message from '../../components/Message/Message';
import Box from '../../components/Box/Box';
import InputField from '../../components/InputField/InputField';
import Span from '../../components/Span/Span';
import Text from '../../components/Text/Text';

import {GRAPE_DARK, TRANSPARENT, WHITE} from '../../constants/colors';
import Label from '../Label/Label';
import {validateInput, InputProps} from './InputHelper';

/* eslint-disable react/jsx-props-no-spreading, react/display-name */
const Input: FC<InputProps> = forwardRef((props, ref) => {
  const {
    label = '',
    labelTKey,
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
    m = 0,
    mv = 0,
    mh = 0,
    bw = 1,
  } = props;
  const isTypePassword = type === 'password';
  const [dynamicInputType, setDynamicInputType] = useState(type);
  const [isDataListVisible, setIsDataListVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState<{
    type: string;
    text: string;
  }>({type: '', text: ''});
  const validationProps = {...props, type: dynamicInputType};
  // const [inputValue, setInputValue] = useState(value || '');
  const {t} = useTranslation();

  const labelText = label || labelTKey;

  return (
    <Label
      className={`input input-type-${dynamicInputType} input-is-${
        inputMessage?.type !== 'error' ? 'valid' : 'invalid'
      }`}
      htmlFor={name}
      pos-rel
      w="100%"
      m={m}
      mh={mh}
      mv={mv}
      bcolor={GRAPE_DARK}
    >
      {labelText && (
        <Span mv={8} flex-row className="input-label" color={labelColor}>
          <Text tKey={labelText} m={0} />
        </Span>
      )}
      <Box flex-row w="100%" bgcolor={WHITE} bcolor={GRAPE_DARK} mh={0} br={8}>
        <InputField
          data-testid="input"
          flex="1"
          flex-row
          m={0}
          bcolor={TRANSPARENT}
          bw={bw}
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
          // value={inputValue}
          onChange={({target: {value, files = null}}) => {
            setInputMessage({text: '', type: 'error'});
            console.log('value', value);
            // setInputValue(value);
            const error = validateInput({value, files}, validationProps);

            if (files) setInputMessage({text: files[0].name, type: 'info'});
            if (onChange) onChange({name, value, files, error, required});
          }}
          onFocus={(event) => {
            if (dataList?.length) setIsDataListVisible(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={(event) => {
            const {
              target: {value, files},
            } = event;
            const error = validateInput({value, files}, validationProps);

            if (error) setInputMessage({text: error, type: 'error'});

            if (onBlur) onBlur(event);
          }}
        />

        {(isTypePassword || (value && value.length)) && (
          // {(isTypePassword || inputValue.length !== 0) && (
          <IconButton
            bgcolor={TRANSPARENT}
            iconSize={14}
            align-m
            flex-row
            type={isTypePassword ? 'view' : 'close'}
            tabIndex={-1}
            onClick={() => {
              if (isTypePassword) {
                return setDynamicInputType(
                  dynamicInputType === 'password' ? 'text' : 'password',
                );
              }
              // setInputValue('');
              if (onChange) onChange({name, value: ''});
            }}
          />
        )}

        {/* {type === 'search' && <Icon type="search" />} */}
      </Box>
      {isDataListVisible && (
        <AutoComplete
          items={dataList}
          value={value}
          // value={inputValue}
          onListItemClick={(item) => {
            const error = validateInput({value}, validationProps);
            // const error = validateInput({value: inputValue}, validationProps);

            console.log('auto complete error', error);
            console.log('item.value', item.value);

            if (error) setInputMessage({text: error, type: 'error'});
            if (onChange) {
              // setInputValue(item.text);
              onChange({name, value: item.text, error, required});
            }
            if (onDataListClick) onDataListClick(item);

            setIsDataListVisible(false);
          }}
        />
      )}

      <Message type={inputMessage.type}>{inputMessage.text}</Message>
    </Label>
  );
});

export default Input;
