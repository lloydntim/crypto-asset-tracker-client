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
  PROFILE = 'Profile',
  ABOUT = 'About',
  WELCOME = 'Welcome',
}

const pages = Object.values(Object.values(Pages));
const authenticatedPages = [Pages.ABOUT];
const NavigationSt = createStylesProps('nav');

const Navigation = ({title = '', titleTKey = '', ...rest}: NavigationProps) => {
  const navigate = useNavigate();
  const {setLoginToken, currentUser} = useAuthentication();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const authenticatedLinks = currentUser()?.id
    ? pages
    : pages.filter((page) => authenticatedPages.includes(page));

  return (
    <NavigationSt
      data-testid="main-nav"
      className="navigation"
      pv={32}
      $w="100%"
      {...rest}
    >
      <Menu
        visible={isMenuVisible}
        onCloseButtonClick={() => setIsMenuVisible(false)}
      >
        <LanguageSwitch />

        <List<string>
          p={0}
          mv={20}
          data={authenticatedLinks}
          renderItem={({item}: {item: string}) => {
            return (
              <Link
                color={GRAPE_EXTRA_DARK}
                txt-deco="none"
                to={`/${item}`}
                tKey={`${item.toLowerCase()}:navTitle`}
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
