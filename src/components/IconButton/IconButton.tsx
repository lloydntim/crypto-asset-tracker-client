import React, { FC, MouseEventHandler, ReactElement, TouchEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../components';

import './IconButton.scss';

interface IconButtonProps {
  type: string;
  rank?: string;
  tabIndex?: number;
  disabled?: boolean;
  isLink?: boolean;
  to?: string;
  onClick: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
  onMouseDown?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  onTouchStart?: TouchEventHandler,
  onTouchEnd?: TouchEventHandler,
}

const IconButton: FC<IconButtonProps> = ({
  rank = 'primary',
  type,
  tabIndex,
  disabled,
  isLink = false,
  to = '',
  onClick,
  onMouseUp,
  onMouseDown,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
}): ReactElement<IconButtonProps> => {
  const navigate = useNavigate();
  return (
    <button
      className={`icon-button icon-type-${type} ${disabled ? 'is-disabled' : `icon-button-rank-${rank}`}`}
      type="button"
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={(event) => {
        if (isLink) return navigate(to);
        onClick(event);
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Icon type={type} />
    </button>
  );
};

export default IconButton;
