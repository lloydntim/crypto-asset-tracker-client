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
  Icon,
} from '../../components';
import {WHITE} from '../../constants/colors';

const Home = () => {
  return (
    <Page name="home">
      <Header>
        <Navigation />
      </Header>

      <Body flex-col flex="1">
        <Box flex-col flex="1" align-m>
          <Box flex-col align-m align-c $w="100%" mt={60} mb={120}>
            <Title tKey="home:title" m={44} />
            <Icon type="logo" sz={220} color={WHITE} />
          </Box>

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
