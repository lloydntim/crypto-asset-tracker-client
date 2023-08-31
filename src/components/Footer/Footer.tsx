import React from 'react';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

interface FooterProps extends StyledProps {
  className?: string;
  startYear?: number;
  companyName: string;
}

const currentYear = new Date().getFullYear();

const FooterSt = createStylesProps('footer');

const Footer = ({
  startYear = currentYear,
  companyName = 'footer',
  ...rest
}: FooterProps) => {
  const companyYears = `${startYear}${
    startYear !== currentYear ? ` - ${currentYear}` : ''
  }`;

  return (
    <FooterSt
      className="footer"
      pos-l={0}
      pos-b={0}
      pv={20}
      $w="100%"
      flex-row
      align-c
      {...rest}
    >
      &copy; {companyYears} {companyName}. All rights reserved.
    </FooterSt>
  );
};

export default Footer;
