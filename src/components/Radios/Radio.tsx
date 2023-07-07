import React, {ChangeEventHandler} from 'react';
import Label from '../Label/Label';
import {GRAPE_DARK, WHITE} from '../../constants/colors';
import InputField from '../InputField/InputField';
import {StyledProps} from '../../helpers/createStyledProps';
import styled from 'styled-components';
import Span from '../Span/Span';

interface RadioProps extends StyledProps {
  name: string;
  value: string;
  label: string;
  labelColor?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioContainerSt = styled(Label)``;
const RadioBackgroundSt = styled(Span)`
  &:after {
    content: ' ';
    background-color: ${GRAPE_DARK};
    visibility: visible;
    width: 12px;
    height: 12px;
    border-radius: 8px;
    background-color: ${({isChecked}: {isChecked: boolean}) =>
      isChecked ? GRAPE_DARK : WHITE};
    display: flex;
  }
`;

const Radio = ({
  name,
  value,
  label,
  labelColor = WHITE,
  checked,
  onChange,
}: RadioProps) => (
  <RadioContainerSt
    color={labelColor}
    className="radio"
    htmlFor={name}
    flex-row
    align-m
    data-testid="radio"
  >
    <InputField
      hidden
      id={name}
      value={value}
      className="radio-input"
      type="radio"
      checked={checked}
      onChange={onChange}
      data-testid="radio-element"
    />
    <RadioBackgroundSt
      flex-row
      br={10}
      size={20}
      bgcolor={WHITE}
      bcolor={WHITE}
      bw={2}
      bs="solid"
      pos-rel
      align-m
      align-c
      className="radio-background"
      isChecked={checked}
    />
    <Span flex-row mv={8} mh={24} className="radio-label">
      {label}
    </Span>
  </RadioContainerSt>
);

export default Radio;
