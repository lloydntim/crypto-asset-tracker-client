import React, { FC, MouseEventHandler, ReactElement, ReactNode } from 'react';
import { IconButton } from '..';

import './Menu.scss';

interface MenuProps {
  children?: ReactNode;
  visible?: boolean;
  onCloseButtonClick: MouseEventHandler;
}

const Menu: FC<MenuProps> = ({
  children,
  visible = false,
  onCloseButtonClick,
}): ReactElement => {
  return (
    <aside className={`menu ${visible ? 'menu-is-visible' : ''}`}>
      <div className="menu-button-close">
        <IconButton
          type="close"
          rank="secondary"
          onClick={onCloseButtonClick}
        />
      </div>

      {children}

    </aside>
  );
};
export default Menu;
