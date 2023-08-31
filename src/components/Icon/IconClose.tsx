import React from 'react';
import {BLACK} from '../../constants/colors';
import {IconProps} from './Icon';

const IconClose = ({$w = 22, $h = 22, $sz = 22, $color = BLACK}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={$sz || $w}
    height={$sz || $h}
    fill={$color}
    viewBox="0 0 384.15 384.15"
    data-testid="icon-close"
  >
    <path
      d="M437.5,386.6,306.9,256,437.5,125.4a36,36,0,1,0-50.9-50.9L256,205.1,125.4,74.5a36,36,0,0,0-50.9,50.9L205.1,256,74.5,386.6a36,36,0,0,0,50.9,50.9L256,306.9,386.6,437.5a36,36,0,0,0,50.9-50.9Z"
      transform="translate(-63.93 -63.92)"
    />
  </svg>
);

export default IconClose;
