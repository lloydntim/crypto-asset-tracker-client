import React from 'react';
import {Page} from '../../layouts';
import {
  Text,
  Header,
  Body,
  Footer,
  Headline,
  Box,
  Radios,
} from '../../components';
import {changeLanguage} from 'i18next';

const About = () => {
  return (
    <Page name="about">
      <Header>
        <Radios
          isButton
          flex-row
          mv={12}
          items={[
            {
              value: 'en',
              label: 'English',
            },
            {
              value: 'de',
              label: 'German',
            },
          ]}
          onChange={({value}) => {
            changeLanguage(value);
          }}
        />
      </Header>
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
