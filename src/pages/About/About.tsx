import React from 'react';
import {Page, PageContent} from '../../layouts';
import {Text, Box} from '../../components';

const About = () => {
  return (
    <Page name="about">
      <PageContent isAuthorised titleTKey="about:title">
        <Box $mv={32} $flex="1">
          <Text $m={0} tKey="about:description" />
        </Box>
      </PageContent>
    </Page>
  );
};

export default About;
