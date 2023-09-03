import React from 'react';
import {Page, PageContent} from '../../layouts';
import {Text, Box} from '../../components';

const NotFound = () => {
  return (
    <Page name="about">
      <PageContent hasHeaderLogo titleTKey="notfound:title">
        <Box $mv={32} $flex="1">
          <Text $m={0} tKey="notfound:description" />
        </Box>
      </PageContent>
    </Page>
  );
};

export default NotFound;
