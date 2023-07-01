import React, {ReactNode} from 'react';

import Box from '../../components/Box/Box';
import {GRAPE_MEDIUM} from '../../constants/Colors';

interface PageProps {
  name: string;
  children: ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading */
const Page = ({name, children}: PageProps) => {
  // display: flex;
  // flex-direction: column;
  // padding: 0 12px;
  // max-width: 664px;
  // margin: 0 auto;
  return (
    <Box
      w="100%"
      flex-col
      ph={12}
      pv={0}
      max-w={640}
      mh="auto"
      min-h="100vh"
      className={`page ${name}-page`}
    >
      {children}
    </Box>
  );
};

export default Page;
