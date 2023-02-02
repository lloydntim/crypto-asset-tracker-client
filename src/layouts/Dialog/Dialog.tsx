import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Button, Headline, IconButton } from '../../components';

import './Dialog.scss';

interface DialogProps {
  title: string;
  children: ReactNode;
  visible: boolean;
  cancelButtonText?: string;
  onCancelButtonClick?: MouseEventHandler;
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
    <div className="dialog">
      <IconButton type="close" onClick={onCancelButtonClick} />
      <div className="content">
        <Headline size="h3">{title}</Headline>

        <div className="dialog-content">{children}</div>

        <div className="button-group">
          <Button onClick={onCancelButtonClick}>
            {cancelButtonText}
          </Button>
          <Button
            rank="secondary"
            onClick={onContinueButtonClick}
          >
            {continueButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
