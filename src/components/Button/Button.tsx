import React, { FC, MouseEventHandler, TouchEventHandler, memo } from 'react';

import { withLocalisation } from '../../hoc';
import { LocalisationProps } from '../../hoc/withLocalisation';

import './Button.scss';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps extends LocalisationProps {
  type?: ButtonType;
  tabIndex?: number;
  rank?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
};

const Button: FC<ButtonProps> = ({
  children,
  type = 'submit',
  rank = 'primary',
  tabIndex,
  disabled,
  onClick,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
}) => {
  return (
    /* eslint-disable react/button-has-type */
    <button
      type={type}
      tabIndex={tabIndex}
      className={`button button-rank-${rank} ${disabled ? 'is-disabled' : ''}`}
      disabled={disabled}
      onClick={(event) => {
        if (type === 'submit') {
          event.preventDefault();
        }
        onClick(event);
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </button>
  );
};

export default memo(withLocalisation<ButtonProps>(Button));
