import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../providers/AuthenticationProvider';
import { Button, Headline } from '../../components';

import './Header.scss';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title?: string;
  titleTKey?: string;
}

const Header: FC<HeaderProps> = ({ title = '', titleTKey }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLoginToken } = useAuthentication();

  return (
    <header className="header">
      <Headline tKey={titleTKey}>{title}</Headline>

      <Button tKey="button.logout" onClick={() => {
        setLoginToken('');
        navigate('/', { replace: true });
      }} />
    </header>
  );
};

export default Header;
