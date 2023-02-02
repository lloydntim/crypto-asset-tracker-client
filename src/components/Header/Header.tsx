import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../providers/AuthenticationProvider';
import { Headline, Button, IconButton, Menu, Link } from '../../components';
import { Dialog } from '../../layouts';

import './Header.scss';
interface HeaderProps {
  title?: string;
  titleTKey?: string;
}

const Header: FC<HeaderProps> = ({ title = '', titleTKey = "" }) => {
  const navigate = useNavigate();
  const { setLoginToken } = useAuthentication();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <header className="header">
      <Menu
        visible={isMenuVisible}
        onCloseButtonClick={() => setIsMenuVisible(false)}
      >
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
            <Link to="/welcome">Welcome</Link>
          </li>
        </ul>
        <Button tKey="button.logout" onClick={() => setIsDialogVisible(true)} />
      </Menu>

      <Headline tKey={titleTKey}>{title}</Headline>
      <IconButton type="menu" onClick={() => setIsMenuVisible(true)} />

      <Dialog
        title="Logout"
        visible={isDialogVisible}
        onCancelButtonClick={() => setIsDialogVisible(false)}
        onContinueButtonClick={() => {
          setIsDialogVisible(false);
          setLoginToken('');
          navigate('/', { replace: true });
        }}
      >
        Do you really want to to log out?
      </Dialog>

    </header>
  );
};

export default Header;
