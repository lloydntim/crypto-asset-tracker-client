import React, {ChangeEventHandler} from 'react';
import styled from 'styled-components';

import {GRAPE_DARK, WHITE} from '../../constants/colors';
import {StyledProps} from '../../helpers/createStyledProps';

import Label from '../Label/Label';
import InputField from '../InputField/InputField';
import Span from '../Span/Span';

interface RadioButtonProps extends StyledProps {
  name: string;
  value: string;
  label?: string;
  labelTKey?: string;
  labelColor?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioButtonConainterSt = styled(Label)``;

const RadioButton = ({
  name,
  value,
  label = '',
  labelTKey = '',
  labelColor = WHITE,
  checked,
  onChange,
}: RadioButtonProps) => (
  <RadioButtonConainterSt
    $color={labelColor}
    className="radio-button"
    htmlFor={name}
    $flex-row
    $align-m
    $bcolor={checked ? WHITE : GRAPE_DARK}
    $bgcolor={checked ? GRAPE_DARK : WHITE}
    $bs="solid"
    $bw={1}
    $br={8}
    $mr={8}
  >
    <InputField
      $hidden
      id={name}
      value={value}
      className="radio-input"
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <Span
      $flex-row
      $mv={8}
      $mh={24}
      className="radio-label"
      tKey={labelTKey}
      $color={checked ? WHITE : GRAPE_DARK}
    >
      {label}
    </Span>
  </RadioButtonConainterSt>
);

export default RadioButton;
