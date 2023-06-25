import React, {MouseEventHandler, PropsWithChildren} from 'react';

import Box from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import IconButton from '../../components/IconButton/IconButton';
import {BLACK_OPACITY_75PC, WHITE} from '../../constants/Colors';

interface DialogProps {
  title: string;
  visible: boolean;
  cancelButtonText?: string;
  onCancelButtonClick: MouseEventHandler;
  continueButtonText?: string;
  onContinueButtonClick?: MouseEventHandler;
}

/* eslint-disable react/jsx-props-no-spreading */
const Dialog = ({
  title,
  children,
  cancelButtonText = 'Cancel',
  continueButtonText = 'Continue',
  onCancelButtonClick,
  onContinueButtonClick,
  visible,
}: PropsWithChildren<DialogProps>) => {
  if (!visible) return null;

  return (
    <Box
      className="dialog"
      data-testid="dialog"
      pos-fix
      pos-t={0}
      pos-l={0}
      cover
      z-idx={4}
      align-c
      flex-col
      bgcolor={BLACK_OPACITY_75PC}
    >
      <Box
        pos-rel
        z-idx={3}
        w="calc(100% - 48px)"
        max-w={408}
        flex-col
        p={28}
        bgcolor={WHITE}
        align-self-c
        className="content"
      >
        <Headline size="h3">{title}</Headline>
        <IconButton
          type="close"
          onClick={onCancelButtonClick}
          pos-abs
          pos-r={12}
          pos-t={8}
        />

        <Box pv={24} className="dialog-content">
          {children}
        </Box>

        <Box align-r className="button-group" w="100%" flex-row>
          <Button rank="secondary" onClick={onContinueButtonClick} align-c>
            {continueButtonText}
          </Button>
          <Button w="35%" p={8} ml={8} onClick={onCancelButtonClick} align-c>
            {cancelButtonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dialog;
