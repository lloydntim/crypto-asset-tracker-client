import React, {FC, MouseEventHandler, ReactElement, ReactNode} from 'react';
import {Box, IconButton, Aside} from '..';

import {WHITE} from '../../constants/Colors';
import {StyledProps} from '../../helpers/createStyledProps';

const MENU_WIDTH = '80%';
interface MenuProps extends StyledProps {
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  onCloseButtonClick: MouseEventHandler;
}

const Menu: FC<MenuProps> = ({
  className = 'menu',
  children,
  visible = false,
  onCloseButtonClick,
  ...rest
}): ReactElement => {
  return (
    <Aside
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
      <Box className="menu-button-close" align-r flex-row>
        <IconButton
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
