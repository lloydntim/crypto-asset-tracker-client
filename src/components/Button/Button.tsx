import React, {FC, MouseEventHandler, TouchEventHandler} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  GRAPE_EXTRA_DARK,
  GRAPE_LIGHT,
  TRANSPARENT,
  WHITE,
} from '../../constants/Colors';
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

const Button: FC<ButtonProps> = ({
  children,
  type = 'submit',
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
  bcolor = TRANSPARENT,
  'flex-row': flexRow = true,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    /* eslint-disable react/button-has-type */
    <ButtonSt
      pv={pv}
      ph={ph}
      flex-row={flexRow}
      color={color}
      bgcolor={bgcolor}
      bcolor={bcolor}
      br={br}
      w={w}
      type={type}
      tabIndex={tabIndex}
      className={`button button-rank-${rank} ${disabled ? 'is-disabled' : ''}`}
      disabled={disabled}
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
