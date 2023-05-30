import React, {FC, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {Headline, Button, IconButton, Menu, Link, List} from '..';
import {Dialog} from '../../layouts';

import {GRAPE_EXTRA_DARK} from '../../constants/Colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
interface NavigationProps extends StyledProps {
  title?: string;
  titleTKey?: string;
}

const NavigationSt = createStylesProps('nav');

const Navigation: FC<NavigationProps> = ({
  title = '',
  titleTKey = '',
  ...rest
}) => {
  const navigate = useNavigate();
  const {setLoginToken} = useAuthentication();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <NavigationSt className="navigation" pv={10} w="100%" {...rest}>
      <Menu
        visible={isMenuVisible}
        onCloseButtonClick={() => setIsMenuVisible(false)}
      >
        <List<string>
          mv={20}
          data={['profile', 'about', 'welcome']}
          renderItem={({item}: {item: string}) => {
            return (
              <Link color={GRAPE_EXTRA_DARK} to={`/${item}`}>{`${item
                .substring(0, 1)
                .toUpperCase()}${item.substring(1, item.length)}`}</Link>
            );
          }}
        ></List>
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
          navigate('/', {replace: true});
        }}
      >
        Do you really want to to log out?
      </Dialog>
    </NavigationSt>
  );
};

export default Navigation;
