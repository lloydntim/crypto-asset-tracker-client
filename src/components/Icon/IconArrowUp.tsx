import React from 'react';
import {BLACK} from '../../constants/colors';
import {IconProps} from './Icon';

const IconArrowUp = ({
  $w = 22,
  $h = 14,
  $sz = 22,
  $color = BLACK,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={$sz || $w}
      height={$sz || $h}
      fill={$color}
      viewBox="0 0 320 192"
      data-testid="icon-arrow-up"
    >
      <g>
        <polygon points="300.6 192 320 171.3 160 0 0 171.3 19.3 192 160 41.5 300.6 192" />
      </g>
    </svg>
  );
};

export default IconArrowUp;
