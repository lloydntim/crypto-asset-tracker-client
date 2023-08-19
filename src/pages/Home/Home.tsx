import React from 'react';

import {Page} from '../../layouts';
import {
  Body,
  Footer,
  Headline as Title,
  Button,
  Box,
  Header,
  Navigation,
} from '../../components';

const Home = () => {
  return (
    <Page name="home">
      <Header>
        <Navigation />
      </Header>

      <Body flex-col flex="1">
        <Title tKey="home:title" />

        <Box flex-col flex="1" align-c align-m>
          <Box flex-col align-str>
            <Button m={8} tKey="button.login" isLink to="/login" />
            <Button m={8} tKey="button.register" isLink to="/register" />
          </Box>
        </Box>
      </Body>

      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Home;
