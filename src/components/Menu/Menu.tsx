import React, {MouseEventHandler, ReactNode} from 'react';

import {WHITE} from '../../constants/Colors';
import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import IconButton from '../IconButton/IconButton';
import Aside from '../Aside/Aside';
import Link from '../Link/Link';

const MENU_WIDTH = '80%';
interface MenuProps extends StyledProps {
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  onCloseButtonClick: MouseEventHandler;
}

const Menu = ({
  className = 'menu',
  children,
  visible = false,
  onCloseButtonClick,
  ...rest
}: MenuProps) => {
  return (
    <Aside
      data-testid="menu"
      animation="left 500ms"
      bgcolor={WHITE}
      pos-fix
      z-idx={4}
      h="100vh"
      p={20}
      w={MENU_WIDTH}
      pos-t={0}
      pos-l={visible ? 0 : `-${MENU_WIDTH}`}
      className={className}
      {...rest}
    >
      <Box
        // data-testid="close-button"
        className="menu-button-close"
        align-r
        flex-row
      >
        <IconButton
          role="button"
          type="close"
          rank="secondary"
          onClick={onCloseButtonClick}
        />
      </Box>

      {children}
    </Aside>
  );
};
export default Menu;
