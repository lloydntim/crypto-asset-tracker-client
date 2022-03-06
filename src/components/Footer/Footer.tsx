import React, { FC } from 'react';

import './Footer.scss';

interface FooterProps {
  startYear: number;
  companyName: string;
}

const Footer: FC<FooterProps> = ({ startYear, companyName }) => {
  const currentYear = new Date().getFullYear();
  const companyYears = startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;

  return (
    <footer className="footer">
      &copy; {companyYears} {companyName}. All rights reserved
    </footer>
  );
};

export default Footer;

