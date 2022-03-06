import React, { FC, useState } from 'react';

import { AutoComplete, IconButton, Message, Icon } from '../../components';
import { validateInput, InputProps } from './InputHelper';

import './Input.scss';

/* eslint-disable react/jsx-props-no-spreading */
const Input: FC<InputProps> = (props: InputProps) => {
  const {
    inputRef,
    label,
    autoComplete,
    autoCapitalize,
    name,
    type = 'text',
    tabIndex,
    placeholder,
    value,
    required,
    onChange,
    onFocus,
    onBlur,
    dataList,
    onDataListClick,
  } = props;
  const isTypePassword = type === 'password';
  const [dynamicInputType, setDynamicInputType] = useState(type);
  const [isDataListVisible, setIsDataListVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState(null);

  return (
    <label
      className={`input input-type-${dynamicInputType} input-is-${inputMessage?.type !== 'error' ? 'valid' : 'invalid'}`}
      htmlFor={name}
    >
      <span className="input-label">{label}</span>
      <input
        ref={inputRef}
        required={required}
        className="input-element"
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        tabIndex={tabIndex}
        name={name}
        type={dynamicInputType}
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value, files } }) => {
          const error = validateInput({ value, files }, props);

          setInputMessage(files ? { text: files[0].name, type: 'info' } : null);
          onChange({ name, value, files, error, required });
        }}
        onFocus={(event) => {
          if (dataList?.length) setIsDataListVisible(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          const { target: { value, files } } = event;
          const error = validateInput({ value, files }, props);

          setInputMessage(error ? { text: error, type: 'error' } : null);

          if (onBlur) onBlur(event);
        }}
      />

      {(isTypePassword || (dataList?.length && value.length > 0)) && (
        <IconButton
          type={isTypePassword ? 'view' : 'close'}
          tabIndex={-1}
          onClick={() =>
            (isTypePassword)
              ? setDynamicInputType(dynamicInputType === 'password' ? 'text' : 'password')
              : onChange({ name, value: '' })
          }
        />
      )}

      {type === 'search' && <Icon type="search" />}

      {isDataListVisible && <AutoComplete items={dataList} value={value} onListItemClick={(item) => {
        const error = validateInput({ value }, props);

        setInputMessage(error ? { text: error, type: 'error' } : null);
        onChange({ name, value: item.text, error, required });
        setIsDataListVisible(false);

        if (onDataListClick) onDataListClick(item);
      }} />}

      <Message type={inputMessage?.type}>{inputMessage?.text}</Message>
    </label>
  );
};

export default Input;
