import React, {ReactNode} from 'react';

import {
  Box,
  Body,
  Footer,
  Header,
  Headline as Title,
  Logo,
  Navigation,
  Text,
} from '../../components';
import {COMPANY_START_YEAR} from '../../constants';

interface PageContentProps {
  title?: string;
  titleTKey?: string;
  hasHeaderLogo?: boolean;
  bodyWidth?: number;
  children?: ReactNode;
}

const PageContent = ({
  title = '',
  titleTKey = '',
  children = null,
  hasHeaderLogo = false,
  bodyWidth = 0,
}: PageContentProps) => {
  return (
    <>
      <Header $flex-row $spc-btw $align-m>
        <Navigation />
        {hasHeaderLogo && <Logo $flex-row $align-m size={24} showText />}
      </Header>

      <Body
        $flex-col
        $align-m
        $flex="1"
        $w="100%"
        $h="auto"
        {...(bodyWidth && {'$max-w': bodyWidth, '$align-self-c': true})}
      >
        {!hasHeaderLogo && (
          <>
            <Text $font-sz={36}>Crypto Asset Tracker</Text>
            <Logo $flex-row $align-c $w="100%" $mv={52} />
          </>
        )}

        {(title || titleTKey) && (
          <Title $mv={0} $align-c $align-self-l tKey={titleTKey}>
            {title}
          </Title>
        )}
        <Box $w="100%">{children}</Box>
      </Body>

      <Footer startYear={COMPANY_START_YEAR} companyName="LNCD" />
    </>
  );
};

export default PageContent;
