import React, {
  FC,
  MouseEventHandler,
  ReactElement,
  TouchEventHandler,
} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button, Icon} from '../../components';
import {StyledProps} from '../../helpers/createStyledProps';

interface IconButtonProps extends StyledProps {
  type: string;
  rank?: string;
  iconHeight?: number;
  iconWidth?: number;
  iconSize?: number;
  iconColor?: string;
  tabIndex?: number;
  disabled?: boolean;
  isLink?: boolean;
  to?: string;
  onClick: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
}

const IconButton: FC<IconButtonProps> = ({
  rank = 'primary',
  type,
  iconHeight,
  iconWidth,
  iconColor,
  iconSize,
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
  ...rest
}): ReactElement<IconButtonProps> => {
  const navigate = useNavigate();
  return (
    <Button
      className={`icon-button icon-type-${type} ${
        disabled ? 'is-disabled' : `icon-button-rank-${rank}`
      }`}
      ph={4}
      pv={4}
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
      {...rest}
    >
      <Icon
        type={type}
        h={iconHeight}
        w={iconWidth}
        color={iconColor}
        sz={iconSize}
      />
    </Button>
  );
};

export default IconButton;
