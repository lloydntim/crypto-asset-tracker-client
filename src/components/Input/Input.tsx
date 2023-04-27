import React, {FC, useState} from 'react';

import {
  AutoComplete,
  IconButton,
  Message,
  Icon,
  InputField,
  Span,
} from '../../components';
import {TRANSPARENT} from '../../constants/Colors';
import Label from '../Label/Label';
import {validateInput, InputProps} from './InputHelper';

// import './Input.scss';

/* eslint-disable react/jsx-props-no-spreading */
const Input: FC<InputProps> = (props) => {
  const {
    inputRef,
    label = '',
    autoComplete,
    autoCapitalize,
    name,
    type = 'text',
    tabIndex,
    placeholder = '',
    value = '',
    required,
    onChange,
    onFocus,
    onBlur,
    dataList = [],
    onDataListClick,
  } = props;
  const isTypePassword = type === 'password';
  const [dynamicInputType, setDynamicInputType] = useState(type);
  const [isDataListVisible, setIsDataListVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState<{
    type: string;
    text: string;
  }>({type: '', text: ''});
  const validationProps = {...props, type: dynamicInputType};

  return (
    <Label
      className={`input input-type-${dynamicInputType} input-is-${
        inputMessage?.type !== 'error' ? 'valid' : 'invalid'
      }`}
      htmlFor={name}
      pos-rel
      w="100%"
    >
      {label && <Span className="input-label">{label}</Span>}
      <InputField
        w="100%"
        ref={inputRef}
        required={required}
        className="input-element"
        autoComplete={dataList.length ? 'off' : autoComplete}
        autoCapitalize={autoCapitalize}
        tabIndex={tabIndex}
        name={name}
        type={dynamicInputType}
        placeholder={placeholder}
        value={value}
        onChange={({target: {value, files = null}}) => {
          setInputMessage({text: '', type: 'error'});

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
        mv={8}
        mh={0}
      />

      {(isTypePassword || (dataList?.length && value.length > 0)) && (
        <IconButton
          pos-abs
          pos-r={10}
          pos-t={12}
          bgcolor={TRANSPARENT}
          iconSize={14}
          type={isTypePassword ? 'view' : 'close'}
          tabIndex={-1}
          onClick={() =>
            isTypePassword
              ? setDynamicInputType(
                  dynamicInputType === 'password' ? 'text' : 'password',
                )
              : onChange && onChange({name, value: ''})
          }
        />
      )}

      {type === 'search' && <Icon type="search" />}

      {isDataListVisible && (
        <AutoComplete
          items={dataList}
          value={value}
          onListItemClick={(item) => {
            const error = validateInput({value}, validationProps);

            console.log('auto complete error', error);

            if (error) setInputMessage({text: error, type: 'error'});
            if (onChange) onChange({name, value: item.value, error, required});
            if (onDataListClick) onDataListClick(item);

            setIsDataListVisible(false);
          }}
        />
      )}

      <Message type={inputMessage.type}>{inputMessage.text}</Message>
    </Label>
  );
};

export default Input;
