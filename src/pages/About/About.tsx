import React from 'react';
import {Page} from '../../layouts';
import {
  Text,
  Header,
  Body,
  Footer,
  Headline,
  Box,
  Navigation,
} from '../../components';

const About = () => {
  return (
    <Page name="about">
      <Header>
        <Navigation />
      </Header>
      <Body flex-col align-c flex="1">
        <Headline tKey="about:title" />

        <Box mv={32} flex="1">
          <Text m={0} tKey="about:description" />
        </Box>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default About;
