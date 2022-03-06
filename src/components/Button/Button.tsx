import React, { FC, MouseEventHandler, TouchEventHandler } from 'react';

import './Button.scss';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps {
  text: string;
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
  text,
  type = 'submit',
  rank = 'primary',
  tabIndex,
  disabled,
  onClick,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
}) => (
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
    {text}
  </button>
);

export default Button;
