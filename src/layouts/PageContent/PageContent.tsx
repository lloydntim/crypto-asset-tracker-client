import React, {ReactNode} from 'react';

import {
  Box,
  Body,
  Footer,
  Header,
  Headline as Title,
  Logo,
  Navigation,
} from '../../components';
import {COMPANY_START_YEAR} from '../../constants';

interface PageContentProps {
  title?: string;
  titleTKey?: string;
  isAuthorised?: boolean;
  bodyWidth?: number;
  children?: ReactNode;
}

const PageContent = ({
  title = '',
  titleTKey = '',
  children = null,
  isAuthorised = false,
  bodyWidth = 0,
}: PageContentProps) => {
  return (
    <>
      <Header flex-row spc-btw align-m>
        <Navigation />
        {isAuthorised && <Logo flex-row align-m size={24} showText />}
      </Header>

      <Body
        flex-col
        align-m
        flex="1"
        {...(bodyWidth && {w: bodyWidth, 'align-self-c': true})}
      >
        {!isAuthorised && <Logo flex-row align-c w="100%" mv={60} />}

        {(title || titleTKey) && (
          <Title mv={24} align-c align-self-l>
            {title}
          </Title>
        )}
        <Box w="100%">{children}</Box>
      </Body>

      <Footer startYear={COMPANY_START_YEAR} companyName="LNCD" />
    </>
  );
};

export default PageContent;
