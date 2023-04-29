import React, {FC, MouseEventHandler, ReactNode} from 'react';

import {Box, Button, Headline, IconButton} from '../../components';

import {BLACK_OPACITY_75PC, WHITE} from '../../constants/Colors';

interface DialogProps {
  title: string;
  children: ReactNode;
  visible: boolean;
  cancelButtonText?: string;
  onCancelButtonClick: MouseEventHandler;
  continueButtonText?: string;
  onContinueButtonClick?: MouseEventHandler;
}

/* eslint-disable react/jsx-props-no-spreading */
const Dialog: FC<DialogProps> = ({
  title,
  children,
  visible,
  cancelButtonText = 'Cancel',
  continueButtonText = 'Continue',
  onCancelButtonClick,
  onContinueButtonClick,
}) => {
  if (!visible) return null;

  return (
    <Box
      className="dialog"
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
