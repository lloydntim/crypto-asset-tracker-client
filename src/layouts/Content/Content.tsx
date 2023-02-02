import React, { FC, ReactElement, ReactNode } from 'react';

interface ContentProps {
  name?: string;
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ name = '', children }): ReactElement => (
  <div className={`content ${name ? `${name}-content` : ''}`}>
    {children}
  </div>
);

export default Content;
