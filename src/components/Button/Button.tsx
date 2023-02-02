import React, { FC, MouseEventHandler, TouchEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { withLocalisation } from '../../hoc';
import { LocalisationProps } from '../../hoc/withLocalisation';

import './Button.scss';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps extends LocalisationProps {
  type?: ButtonType;
  tabIndex?: number;
  rank?: string;
  disabled?: boolean;
  isLink?: boolean;
  to?: string;
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
  isLink = false,
  to = '',
  onClick,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
}) => {
  const navigate = useNavigate();
  return (
    /* eslint-disable react/button-has-type */
    <button
      type={type}
      tabIndex={tabIndex}
      className={`button button-rank-${rank} ${disabled ? 'is-disabled' : ''}`}
      disabled={disabled}
      onClick={(event) => {
        if (isLink) return navigate(to);
        if (type === 'submit') event.preventDefault();

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

export default withLocalisation<ButtonProps>(Button);
