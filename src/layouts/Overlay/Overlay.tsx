import React, { FC, ReactNode, MouseEventHandler } from 'react';

import { Headline, IconButton } from '../../components';

import './Overlay.scss';

interface OverlayProps {
  title?: string;
  children: ReactNode;
  visible: boolean;
  onCloseButtonClick: MouseEventHandler;
}

/* eslint-disable react/jsx-props-no-spreading */
const Overlay: FC<OverlayProps> = ({ children, title, visible, onCloseButtonClick }) => {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="overlay-button-close">
        <IconButton
          type="close"
          rank="secondary"
          onClick={onCloseButtonClick}
        />
      </div>

      <div className="overlay-content">
        <Headline>{title}</Headline>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
