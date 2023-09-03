import React, {ReactNode} from 'react';

import {TRANSPARENT, WHITE} from '../../constants/colors';
import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import IconButton from '../IconButton/IconButton';
import Aside from '../Aside/Aside';
import Button from '../Button/Button';

const MENU_WIDTH = '80%';
const MENU_MAX_WIDTH = 480;
interface MenuProps extends StyledProps {
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  onCloseButtonClick: () => void;
}

const Menu = ({
  className = 'menu',
  children,
  visible = false,
  onCloseButtonClick,
  ...rest
}: MenuProps) => {
  return (
    <>
      {visible && (
        // This button component registers outside click to close menu
        <Button
          $h="100vh"
          $w="100vw"
          $pos-fix
          $pos-t={0}
          $pos-l={0}
          $bgcolor={TRANSPARENT}
          $z-idx={3}
          onClick={() => onCloseButtonClick()}
        >
          &nbsp;
        </Button>
      )}
      <Aside
        data-testid="menu"
        $animation="left 500ms"
        $bgcolor={WHITE}
        $pos-fix
        $z-idx={4}
        $h="100vh"
        $pv={20}
        $pl={40}
        $pr={20}
        $w={MENU_WIDTH}
        $max-w={MENU_MAX_WIDTH}
        $pos-t={0}
        $pos-l={visible ? 0 : `-${MENU_WIDTH}`}
        className={className}
        {...rest}
      >
        <Box className="menu-button-close" $align-r $flex-row>
          <IconButton
            role="button"
            type="close"
            rank="secondary"
            onMouseDown={() => onCloseButtonClick()}
          />
        </Box>

        {children}
      </Aside>
    </>
  );
};
export default Menu;
