import React, { FC, MouseEventHandler, ReactElement, TouchEventHandler } from 'react';
import Icon from '../Icon/Icon';

import './IconButton.scss';

interface IconButtonProps {
  type: string;
  rank?: string;
  tabIndex?: number;
  disabled?: boolean;
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
  onClick,
  onMouseUp,
  onMouseDown,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
}): ReactElement<IconButtonProps> => (
  <button
    className={`icon-button icon-type-${type} ${disabled ? 'is-disabled' : `icon-button-rank-${rank}`}`}
    type="button"
    tabIndex={tabIndex}
    disabled={disabled}
    onClick={onClick}
    onMouseUp={onMouseUp}
    onMouseDown={onMouseDown}
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <Icon type={type} />
  </button>
);

export default IconButton;
