import React, { FC, ReactElement } from 'react';

import { withLocalisation } from '../../hoc';
import { LocalisationProps } from '../../hoc/withLocalisation';

import './Text.scss';

export interface TextProps extends LocalisationProps {
  className?: string;
  type?: string;
}

const Text: FC<TextProps> = ({
  type = 'standard',
  children,
  className = '',
}): ReactElement => (
  <span className={`text text-type-${type} ${className}`}>
    {children}
  </span>
);

export default withLocalisation<TextProps>(Text);
