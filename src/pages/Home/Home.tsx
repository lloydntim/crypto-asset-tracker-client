import React, { FC } from 'react';

import { Page } from '../../layouts';
import { Header, Body, Footer, Headline, Button } from '../../components';

const Home: FC = () => {
  return (
    <Page name="home">
      <Header />

      <Body>
        <Headline>Home</Headline>

        <Button tKey="button.login" isLink to="/login" />
        <br />

        <Button isLink to="/signup">Signup</Button>
        <br />

      </Body>

      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Home;
