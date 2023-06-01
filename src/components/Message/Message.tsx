import React, {FC, ReactNode} from 'react';

import './Message.scss';
import Box from '../Box/Box';
import {StyledProps} from '../../helpers/createStyledProps';

interface MessageProps extends StyledProps {
  visible?: boolean;
  type?: string;
  children?: ReactNode | null;
}

/* eslint-disable react/jsx-props-no-spreading */
const Message: FC<MessageProps> = ({
  type = 'info',
  children = null,
  ...rest
}) => {
  if (!children) return null;

  return (
    <Box {...rest} className={`message message-${type}`}>
      {children}
    </Box>
  );
};

export default Message;
