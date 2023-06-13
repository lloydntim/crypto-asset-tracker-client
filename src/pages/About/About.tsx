import React, {FC} from 'react';
import {Page} from '../../layouts';
import {Text, Header, Body, Footer, Headline, Box} from '../../components';

const About: FC = () => {
  return (
    <Page name="about">
      <Header />
      <Body flex-col align-c flex="1">
        <Headline tKey="about:title" />

        <Box flex="1">
          <Text tKey="about:description" />
        </Box>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default About;
