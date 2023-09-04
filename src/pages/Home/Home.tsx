import React from 'react';

import {Page, PageContent} from '../../layouts';
import {Button, Box} from '../../components';
import {FORM_WIDTH} from '../../constants';

const Home = () => {
  return (
    <Page name="home">
      <PageContent bodyWidth={FORM_WIDTH}>
        <Box $flex-row $align-c $align-str $w="100%" $mt={40}>
          <Box $flex-col $align-m $align-str $w={300}>
            <Button $m={8} tKey="button.login" isLink to="/login" />
            <Button $m={8} tKey="button.register" isLink to="/register" />
          </Box>
        </Box>
      </PageContent>
    </Page>
  );
};

export default Home;
