import React, { FC, ReactNode, ReactElement } from 'react';

import './Message.scss';

interface MessageProps {
  visible?: boolean;
  type: string;
  children?: ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading */
const Message: FC<MessageProps> = ({
  type,
  children = null,
}): ReactElement<MessageProps> => {
  if (!children) return null;

  return (
    <div className={`message message-${type}`}>
      {children}
    </div>
  );
};

export default Message;
