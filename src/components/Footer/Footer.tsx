import React, {FC} from 'react';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

interface FooterProps extends StyledProps {
  className?: string;
  startYear: number;
  companyName: string;
}

const FooterSt = createStylesProps('footer');

const Footer: FC<FooterProps> = ({
  startYear,
  companyName = 'footer',
  ...rest
}) => {
  const currentYear = new Date().getFullYear();
  const companyYears =
    startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;

  return (
    <FooterSt
      className="footer"
      pos-l={0}
      pos-b={0}
      pv={20}
      w="100%"
      flex-row
      align-c
      {...rest}
    >
      &copy; {companyYears} {companyName}. All rights reserved.
    </FooterSt>
  );
};

export default Footer;
