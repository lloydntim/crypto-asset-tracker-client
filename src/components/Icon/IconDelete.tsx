import React from 'react';
import {BLACK} from '../../constants/colors';

const IconDelete = ({
  w = 22,
  h = 22,
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
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      width={sz || w}
      height={sz || h}
      fill={color}
      data-testid="icon-delete"
    >
      <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z" />
    </svg>
  );
};

export default IconDelete;
