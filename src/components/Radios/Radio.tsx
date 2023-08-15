import React, {ChangeEventHandler} from 'react';
import RadioContainer from '../Label/Label';
import {GRAPE_DARK, WHITE} from '../../constants/colors';
import InputField from '../InputField/InputField';
import {StyledProps} from '../../helpers/createStyledProps';
import styled from 'styled-components';
import Span from '../Span/Span';

interface RadioProps extends StyledProps {
  name: string;
  value: string;
  label?: string;
  labelTKey?: string;
  labelColor?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioBackgroundSt = styled(Span)<{isChecked: boolean}>`
  &:after {
    content: ' ';
    background-color: ${GRAPE_DARK};
    visibility: visible;
    width: 12px;
    height: 12px;
    border-radius: 8px;
    background-color: ${({isChecked}) => (isChecked ? GRAPE_DARK : WHITE)};
    display: flex;
  }
`;

const Radio = ({
  name,
  value,
  label,
  labelTKey = '',
  labelColor = WHITE,
  checked,
  onChange,
}: RadioProps) => (
  <RadioContainer
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
      sz={20}
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
    <Span tKey={labelTKey} flex-row mv={8} mh={24} className="radio-label">
      {label}
    </Span>
  </RadioContainer>
);

export default Radio;
