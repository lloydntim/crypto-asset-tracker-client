import React, {ReactNode, MouseEventHandler, PropsWithChildren} from 'react';

import Box from '../../components/Box/Box';
import Headline from '../../components/Headline/Headline';
import IconButton from '../../components/IconButton/IconButton';

import {DARKGREY, WHITE} from '../../constants/Colors';

interface OverlayProps {
  title?: string;
  visible: boolean;
  onCloseButtonClick: MouseEventHandler;
}

/* eslint-disable react/jsx-props-no-spreading */
const Overlay = ({
  children,
  title,
  visible,
  onCloseButtonClick,
}: PropsWithChildren<OverlayProps>) => {
  if (!visible) return null;

  return (
    <Box
      data-testid="overlay"
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
      <IconButton
        type="close"
        rank="secondary"
        aria-label="close-button"
        flex-row
        align-self-r
        onClick={onCloseButtonClick}
        z-idx={1}
      />

      <Box pos-rel pos-b={48} className="overlay-content">
        <Headline mv={16}>{title}</Headline>
        {children}
      </Box>
    </Box>
  );
};

export default Overlay;
