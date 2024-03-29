import React from 'react';
import {BLACK} from '../../constants/colors';
import {IconProps} from './Icon';

const IconEdit = ({$w = 22, $h = 22, $sz = 22, $color = BLACK}: IconProps) => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 16 16"
      width={$sz || $w}
      height={$sz || $h}
      fill={$color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-edit"
    >
      <path d="M2.453,9.297C1.754,9.996,1,13.703,1,14c0,0.521,0.406,1,1,1c0.297,0,4.004-0.754,4.703-1.453l5.722-5.722l-4.25-4.25  L2.453,9.297z M12,1c-0.602,0-1.449,0.199-2.141,0.891L9.575,2.175l4.25,4.25l0.284-0.284C14.746,5.504,15,4.695,15,4  C15,2.343,13.656,1,12,1z" />
    </svg>
  );
};

export default IconEdit;
