import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../providers/AuthenticationProvider';
import { Button, Headline } from '../../components';

import './Header.scss';

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title = '' }) => {
  const navigate = useNavigate();
  const { setLoginToken } = useAuthentication();

  return (
    <header className="header">
      <Headline>{title}</Headline>

      <Button text="Logout" onClick={() => {
        setLoginToken('');
        navigate('/', { replace: true });
      }} />
    </header>
  );
};

export default Header;
