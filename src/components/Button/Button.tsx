import React, {MouseEventHandler, TouchEventHandler} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  GRAPE_EXTRA_DARK,
  GRAPE_LIGHT,
  TRANSPARENT,
} from '../../constants/colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

import {withLocalisation} from '../../hoc';
import {LocalisationProps} from '../../hoc/withLocalisation';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps extends LocalisationProps, StyledProps {
  className?: string;
  type?: ButtonType;
  tabIndex?: number;
  rank?: string;
  disabled?: boolean;
  isLink?: boolean;
  to?: string;
  onClick?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
}

const ButtonSt = createStylesProps('button');

const Button = ({
  children,
  type = 'button',
  rank = 'primary',
  tabIndex,
  disabled,
  isLink = false,
  to = '',
  onClick,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  pv = 8,
  ph = 24,
  color = GRAPE_EXTRA_DARK,
  bgcolor = GRAPE_LIGHT,
  br = 8,
  w = 'auto',
  'align-c': alignC = true,
  bcolor = TRANSPARENT,
  'flex-row': flexRow = true,
  'crsr-pointer': crsrPointer = true,
  ...rest
}: ButtonProps) => {
  const navigate = useNavigate();
  return (
    /* eslint-disable react/button-has-type */
    <ButtonSt
      pv={pv}
      ph={ph}
      flex-row={flexRow}
      crsr-pointer={crsrPointer}
      color={color}
      bgcolor={bgcolor}
      bcolor={bcolor}
      br={br}
      w={w}
      type={type}
      tabIndex={tabIndex}
      className={`button button-rank-${rank} ${disabled ? 'is-disabled' : ''}`}
      disabled={disabled}
      align-c={alignC}
      /* eslint-disable @typescript-eslint/no-explicit-any */
      onClick={(event: any) => {
        if (isLink) return navigate(to);
        if (type === 'submit') event.preventDefault();

        if (onClick) onClick(event);
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      {...rest}
    >
      {children}
    </ButtonSt>
  );
};

export default withLocalisation<ButtonProps>(Button);
