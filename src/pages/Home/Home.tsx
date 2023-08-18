import React, {FC} from 'react';

import {Page} from '../../layouts';
import {
  Body,
  Footer,
  Headline as Title,
  Button,
  Box,
  Header,
} from '../../components';

const Home: FC = () => {
  return (
    <Page name="home">
      <Header>
        <Title>Crypto Asset Checker</Title>
      </Header>

      <Body flex-col flex="1">
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
