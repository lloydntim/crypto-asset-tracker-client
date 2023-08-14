import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../../providers/AuthenticationProvider';

import Headline from '../Headline/Headline';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';
import Link from '../Link/Link';
import List from '../List/List';

import Dialog from '../../layouts/Dialog/Dialog';

import {GRAPE_EXTRA_DARK} from '../../constants/colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
interface BlockProps extends StyledProps {
  title?: string;
  titleTKey?: string;
}

const BlockSt = createStylesProps('nav');

const Block = ({title = '', titleTKey = '', ...rest}: BlockProps) => {
  const navigate = useNavigate();
  const {setLoginToken} = useAuthentication();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <BlockSt
      data-testid="main-nav"
      className="navigation"
      pv={10}
      w="100%"
      {...rest}
    >
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
        />
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
    </BlockSt>
  );
};

export default Block;
