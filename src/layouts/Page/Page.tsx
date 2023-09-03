import React, {ReactNode} from 'react';

import Box from '../../components/Box/Box';

interface PageProps {
  name: string;
  children: ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading */
const Page = ({name, children}: PageProps) => {
  return (
    <Box
      $w="100%"
      $flex-col
      $ph={12}
      $pv={0}
      $max-w={640}
      $mh="auto"
      $min-h="100%"
      className={`page ${name}-page`}
    >
      {children}
    </Box>
  );
};

export default Page;
