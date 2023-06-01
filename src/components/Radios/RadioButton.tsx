import React, {ChangeEventHandler, FC, ReactElement} from 'react';
import styled from 'styled-components';

import {GRAPE_DARK, TRANSPARENT, WHITE} from '../../constants/Colors';
import {StyledProps} from '../../helpers/createStyledProps';

import Label from '../Label/Label';
import InputField from '../InputField/InputField';
import Span from '../Span/Span';

/* eslint-disable react/jsx-props-no-spreading */
interface RadioButtonProps extends StyledProps {
  name: string;
  value: string;
  label: string;
  labelColor?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioButtonConainterSt = styled(Label)``;

const RadioButton: FC<RadioButtonProps> = ({
  name,
  value,
  label = '',
  labelColor = WHITE,
  checked,
  onChange,
}): ReactElement => (
  <RadioButtonConainterSt
    color={labelColor}
    className="radio-button"
    htmlFor={name}
    flex-row
    align-m
    bcolor={WHITE}
    bgcolor={checked ? WHITE : TRANSPARENT}
    bs="solid"
    bw={1}
    br={8}
    mr={8}
  >
    <InputField
      hidden
      id={name}
      value={value}
      className="radio-input"
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    {label && (
      <Span
        flex-row
        mv={8}
        mh={24}
        className="radio-label"
        color={checked ? GRAPE_DARK : WHITE}
      >
        {label}
      </Span>
    )}
  </RadioButtonConainterSt>
);

export default RadioButton;
