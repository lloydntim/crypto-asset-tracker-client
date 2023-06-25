import React, {FC, ReactElement, ReactNode} from 'react';
import Box from '../Box/Box';

import {StyledProps} from '../../helpers/createStyledProps';

interface BodyProps extends StyledProps {
  children: ReactNode;
}

const Body: FC<BodyProps> = ({children, ...rest}): ReactElement => {
  return (
    <Box className="body" role="section" h="100%" {...rest}>
      {children}
    </Box>
  );
};

export default Body;
