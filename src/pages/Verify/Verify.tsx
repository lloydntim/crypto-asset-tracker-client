
import React, { FC, useState } from 'react';
import { Page } from '../../layouts';
import { Text, Header, Body, Footer, Headline/* , Message */ } from '../../components';

const Verify: FC = () => {
  // const [message, setMessage] = useState(null);
  return (
    <Page name="verify">
      <Header />
      <Body>
        <Headline>Verify</Headline>
        {/* <Message type={message?.type}>{message?.text}</Message> */}
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Verify;
