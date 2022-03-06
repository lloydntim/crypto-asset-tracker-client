import React, { FC, ReactElement } from 'react';

import './Body.scss';

const Body: FC = ({ children }): ReactElement => {

  return (
    <div className="body">
      {children}
    </div>
  );
};

export default Body;
