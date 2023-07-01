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
} from '../../constants/Colors';

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
    bgColor: YELLOW,
    borderColor: YELLOW_LIGHT,
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
  color = WHITE,
  children = null,
  tKey = '',
  fontSz = 18,
  ...rest
}: MessageProps) => {
  if (!children && !tKey) return null;

  const {bgColor, borderColor} = MessageStatusMapper[type];
  const content = tKey ? (
    <Text font-sz={fontSz} color={borderColor} tKey={tKey} />
  ) : (
    children
  );

  return (
    <Box
      role="alert"
      w="100%"
      flex-row
      br={8}
      bw={1}
      bs="solid"
      bcolor={borderColor}
      bgcolor={bgColor}
      mv={16}
      p={12}
      color={color}
      align-c
      {...rest}
      className={`message message-${type}`}
    >
      {content}
    </Box>
  );
};

export default Message;
