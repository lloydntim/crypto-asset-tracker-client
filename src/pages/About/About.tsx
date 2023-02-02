import React, { FC } from 'react';
import { Page } from '../../layouts';
import { Text, Header, Body, Footer, Headline } from '../../components';

const About: FC = () => {
  return (
    <Page name="about">
      <Header />
      <Body>
        <Headline>About Us</Headline>
        <Text>About us text</Text>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default About;
