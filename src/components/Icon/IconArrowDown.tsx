import React from 'react';
import {BLACK} from '../../constants/Colors';

const IconArrowDown = ({
  w = 22,
  h = 14,
  sz = 22,
  color = BLACK,
}: {
  w?: number;
  h?: number;
  sz?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 192"
      width={sz || w}
      height={sz || h}
      fill={color}
      data-testid="icon-arrow-down"
    >
      <g>
        <polygon points="19.4 0 0 20.7 160 192 320 20.7 300.7 0 160 150.5 19.4 0" />
      </g>
    </svg>
  );
};

export default IconArrowDown;
