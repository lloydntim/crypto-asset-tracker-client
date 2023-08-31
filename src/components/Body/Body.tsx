import React, {ReactNode} from 'react';
import Box from '../Box/Box';

import {StyledProps} from '../../helpers/createStyledProps';

interface BodyProps extends StyledProps {
  children: ReactNode;
}

const Body = ({children, ...rest}: BodyProps) => {
  return (
    <Box className="body" role="section" $h="100%" {...rest}>
      {children}
    </Box>
  );
};

export default Body;
