import React from 'react';
import {BLACK} from '../../constants/Colors';

const IconArrowUp = ({
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
      width={sz || w}
      height={sz || h}
      fill={color}
      viewBox="0 0 320 192"
    >
      <g>
        <polygon points="300.6 192 320 171.3 160 0 0 171.3 19.3 192 160 41.5 300.6 192" />
      </g>
    </svg>
  );
};

export default IconArrowUp;
