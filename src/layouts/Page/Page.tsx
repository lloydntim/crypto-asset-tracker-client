import React, { FC, ReactNode, ReactElement } from 'react';

import './Page.scss';

interface PageProps {
  name: string;
  children: ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading */
const Page: FC<PageProps> = ({ name, children }): ReactElement<PageProps> => {
  return (
    <div className={`page ${name}-page`}>
      {children}
    </div>
  );
};

export default Page;
