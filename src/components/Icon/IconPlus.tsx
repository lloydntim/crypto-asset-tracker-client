import React from 'react';
import {BLACK} from '../../constants/colors';
import {IconProps} from './Icon';

const IconPlus = ({$w = 22, $h = 22, $sz = 22, $color = BLACK}: IconProps) => {
  return (
    <svg
      version="1.1"
      width={$sz || $w}
      height={$sz || $h}
      fill={$color}
      viewBox="-4 3 32 16"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-plus"
    >
      <path
        clipRule="evenodd"
        d="M22.5,14H14v8.5c0,0.276-0.224,0.5-0.5,0.5h-4C9.224,23,9,22.776,9,22.5V14H0.5  C0.224,14,0,13.776,0,13.5v-4C0,9.224,0.224,9,0.5,9H9V0.5C9,0.224,9.224,0,9.5,0h4C13.776,0,14,0.224,14,0.5V9h8.5  C22.776,9,23,9.224,23,9.5v4C23,13.776,22.776,14,22.5,14z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconPlus;
