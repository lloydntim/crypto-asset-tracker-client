import React, {FC, ReactElement} from 'react';
import Box from '../Box/Box';

import './Body.scss';
import {StyledProps} from '../../helpers/createStyledProps';

interface BodyProps extends StyledProps {
  children: JSX.Element | JSX.Element[];
}

const Body: FC<BodyProps> = ({children, ...rest}): ReactElement => {
  return (
    <Box className="body" {...rest}>
      {children}
    </Box>
  );
};

export default Body;
