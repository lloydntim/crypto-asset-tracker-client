import React, {ChangeEventHandler} from 'react';
import styled from 'styled-components';
import Span from '../Span/Span';
import InputField from '../InputField/InputField';
import Label from '../Label/Label';

import {DARKGREY, GRAPE_MEDIUM} from '../../constants/colors';

interface CheckboxProps {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  ['as-switch']?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const BackgroundSt = styled(Span)<{checked: boolean; asSwitch: boolean}>`
  &:after {
    content: ' ';
    position: absolute;
    ${({checked, asSwitch}) =>
      asSwitch
        ? `
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: $white;
            display: flex;
            ${checked && `left: 16px;`}
          `
        : `
            display: ${checked ? 'flex' : 'none'};
            left: 5px;
            top: 2px;
            width: 6px;
            height: 11px;
            border: solid $white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          `}
  }
`;
const Checkbox = ({
  name,
  label = '',
  checked = false,
  disabled = false,
  ['as-switch']: asSwitch = false,
  onChange,
}: CheckboxProps) => {
  const isActiveColor = checked ? GRAPE_MEDIUM : DARKGREY;

  return (
    <Label
      $crsr-pointer
      $flex-row
      $align-r
      $align-m
      $opacity={disabled ? 0.33 : 1}
      className={`checkbox ${asSwitch && 'as-switch'}`}
      data-testid="checkbox-label"
      htmlFor={name}
    >
      {label && (
        <Span $mr={8} $color={isActiveColor} className="checkbox-label-text">
          {label}
        </Span>
      )}
      <InputField
        $hidden
        $pos-abs
        $pos-l={0}
        $pos-r={0}
        id={name}
        disabled={disabled}
        className="checkbox-element"
        type="checkbox"
        data-testid="checkbox-element"
        checked={checked}
        onChange={onChange}
      />
      <BackgroundSt
        $pos-rel
        {...(asSwitch
          ? {
              $br: 10,
              w: 36,
              h: 20,
            }
          : {
              $br: 6,
              sz: 20,
            })}
        $bs="solid"
        checked={checked}
        asSwitch={asSwitch}
        $bgcolor={isActiveColor}
        $bcolor={isActiveColor}
        className="checkbox-background"
      />
    </Label>
  );
};

export default Checkbox;
