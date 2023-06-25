import React, {ReactNode} from 'react';

import Box from '../../components/Box/Box';

interface PageProps {
  name: string;
  children: ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading */
const Page = ({name, children}: PageProps) => {
  return (
    <Box w="100%" max-w={1200} min-h="100vh" className={`page ${name}-page`}>
      {children}
    </Box>
  );
};

export default Page;
