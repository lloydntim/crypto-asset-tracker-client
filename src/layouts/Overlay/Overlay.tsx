import React, {FC, ReactNode, MouseEventHandler} from 'react';

import {Box, Headline, IconButton} from '../../components';

// import './Overlay.scss';
import {DARKGREY, WHITE} from '../../constants/Colors';
import {TFunction} from 'i18next';

interface OverlayProps {
  title?: string;
  children: ReactNode;
  visible: boolean;
  onCloseButtonClick: MouseEventHandler;
}

/* eslint-disable react/jsx-props-no-spreading */
const Overlay: FC<OverlayProps> = ({
  children,
  title,
  visible,
  onCloseButtonClick,
}) => {
  if (!visible) return null;

  return (
    <Box
      className="overlay"
      pos-fix
      pos-t={0}
      pos-l={0}
      cover
      bgcolor={WHITE}
      z-idx={10}
      flex-col
      color={DARKGREY}
      pv={12}
      ph={28}
    >
      {/*  <Box className="overlay-button-close"> */}
      <IconButton
        type="close"
        rank="secondary"
        flex-row
        align-self-r
        onClick={onCloseButtonClick}
        z-idx={1}
      />
      {/*  </Box> */}

      <Box pos-rel pos-b={48} className="overlay-content">
        <Headline mv={16}>{title}</Headline>
        {children}
      </Box>
    </Box>
  );
};

export default Overlay;
