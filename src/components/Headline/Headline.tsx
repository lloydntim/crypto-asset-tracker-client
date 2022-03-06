import React, { FC, ReactElement } from 'react';
import { withLocalisation } from '../../hoc';

import { TextProps } from '../Text/Text';

import './Headline.scss';


export type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface HeadlineProps extends TextProps {
  size?: HeadlineSize;
}

const Headline: FC<HeadlineProps> = ({
  size = 'h1',
  children,
  className = ''
}): ReactElement => {
  const HeadlineTag = size;

  return (
    <HeadlineTag className={`headline headline-size-${size} ${className}`}>
      {children}
    </HeadlineTag>
  );
};

export default withLocalisation<HeadlineProps>(Headline);
