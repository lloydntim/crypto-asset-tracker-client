import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../../providers/AuthenticationProvider';

import Headline from '../Headline/Headline';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';
import Link from '../Link/Link';
import List from '../List/List';
import Text from '../Text/Text';

import Dialog from '../../layouts/Dialog/Dialog';

import {GRAPE_EXTRA_DARK} from '../../constants/colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
interface NavigationProps extends StyledProps {
  title?: string;
  titleTKey?: string;
}

enum Pages {
  HOME = 'Home',
  PORTFOLIO = 'Portfolio',
  PROFILE = 'Profile',
  ABOUT = 'About',
}

const pages = Object.values(Pages);
const authenticatedPageLinks = [Pages.PORTFOLIO, Pages.PROFILE];
const NavigationSt = createStylesProps('nav');

const Navigation = ({title = '', titleTKey = '', ...rest}: NavigationProps) => {
  const navigate = useNavigate();
  const {setLoginToken, currentUser} = useAuthentication();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const pageLinkPaths = currentUser()?.id
    ? pages
    : pages.filter((page) => !authenticatedPageLinks.includes(page));

  const getPageLinkPath = (path: Pages) =>
    (path !== Pages.HOME ? path : '').toLowerCase();
  return (
    <NavigationSt
      data-testid="main-nav"
      className="navigation"
      $pv={32}
      $w="100%"
      {...rest}
    >
      <Menu
        visible={isMenuVisible}
        onCloseButtonClick={() => setIsMenuVisible(false)}
      >
        <LanguageSwitch />

        <List<Pages>
          $p={0}
          $mv={20}
          data={pageLinkPaths}
          renderItem={({item: path}) => {
            return (
              <Link
                $color={GRAPE_EXTRA_DARK}
                $txt-deco="none"
                to={`/${getPageLinkPath(path)}`}
                tKey={`${path.toLowerCase()}:navTitle`}
              />
            );
          }}
        />
        <Button tKey="button.logout" onClick={() => setIsDialogVisible(true)} />
      </Menu>

      <Headline tKey={titleTKey}>{title}</Headline>
      <IconButton type="menu" onClick={() => setIsMenuVisible(true)} />

      <Dialog
        titleTKey="common:nav.dialog.title"
        visible={isDialogVisible}
        onCancelButtonClick={() => setIsDialogVisible(false)}
        onContinueButtonClick={() => {
          setIsDialogVisible(false);
          setLoginToken('');
          navigate('/', {replace: true});
        }}
      >
        <Text tKey="common:nav.dialog.text" />
      </Dialog>
    </NavigationSt>
  );
};

export default Navigation;
