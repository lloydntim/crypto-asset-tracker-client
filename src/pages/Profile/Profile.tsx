import React, { FC } from 'react';
import { Page } from '../../layouts';
import { Text, Header, Body, Footer, Headline } from '../../components';

const Profile: FC = () => {
  return (
    <Page name="profile">
      <Header />
      <Body>
        <Headline>Profile</Headline>
        <Text>User profile details</Text>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Profile;
