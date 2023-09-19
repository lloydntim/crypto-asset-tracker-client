import React from 'react';

import {Page, PageContent} from '../../layouts';
import {Button, Box, Text} from '../../components';
import {DEFAULT_LINE_HEIGHT, FORM_WIDTH} from '../../constants';

const Home = () => {
  return (
    <Page name="home">
      <PageContent bodyWidth={FORM_WIDTH}>
        <Box $flex-row $align-c $align-str $w="100%" $mt={40}>
          <Box $flex-col $align-m $align-str $w={300}>
            <Box $flex-row $align-m $pos-rel $pos-b={40}>
              <Text
                tKey="home:intro"
                $txt-align-c
                $lh={DEFAULT_LINE_HEIGHT}
                $font-sz={20}
              />
            </Box>

            <Button $m={8} tKey="button.login" isLink to="/login" />
            <Button $m={8} tKey="button.register" isLink to="/register" />
          </Box>
        </Box>
      </PageContent>
    </Page>
  );
};

export default Home;
