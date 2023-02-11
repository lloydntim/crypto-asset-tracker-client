import React, {FC, ReactElement} from 'react';
import Box from '../Box/Box';

import './Body.scss';

interface BodyProps {
  children: JSX.Element | JSX.Element[];
}

const Body: FC<BodyProps> = ({children}): ReactElement => {
  return <Box className="body">{children}</Box>;
};

export default Body;
