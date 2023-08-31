import React, {ReactNode} from 'react';

import Box from '../Box/Box';
import {StyledProps} from '../../helpers/createStyledProps';
import Text from '../Text/Text';
import {
  BLUE,
  BLUE_LIGHT,
  RED,
  RED_LIGHT,
  WHITE,
  YELLOW,
  YELLOW_LIGHT,
} from '../../constants/colors';

interface MessageProps extends StyledProps {
  visible?: boolean;
  type?: string;
  tKey?: string;
  fontSz?: number;
  children?: ReactNode;
}

const MessageStatusMapper: {
  [key: string]: {bgColor: string; borderColor: string};
} = {
  info: {
    bgColor: YELLOW_LIGHT,
    borderColor: YELLOW,
  },
  error: {
    bgColor: RED_LIGHT,
    borderColor: RED,
  },
  success: {
    bgColor: BLUE_LIGHT,
    borderColor: BLUE,
  },
};

/* eslint-disable react/jsx-props-no-spreading */
const Message = ({
  type = 'info',
  $color = WHITE,
  children = null,
  tKey = '',
  fontSz = 18,
  $mv = 16,
  ...rest
}: MessageProps) => {
  if (!children && !tKey) return null;

  const {bgColor, borderColor} = MessageStatusMapper[type];
  const content = tKey ? (
    <Text $m={0} $font-sz={fontSz} $color={borderColor} tKey={tKey} />
  ) : (
    children
  );

  return (
    <Box
      role="alert"
      $w="100%"
      $flex-row
      $br={8}
      $bw={1}
      $bs="solid"
      $bcolor={borderColor}
      $bgcolor={bgColor}
      $mv={$mv}
      $p={12}
      $color={borderColor}
      $align-c
      {...rest}
      className={`message message-${type}`}
    >
      {content}
    </Box>
  );
};

export default Message;
