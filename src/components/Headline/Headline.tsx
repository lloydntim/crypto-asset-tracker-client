import React from 'react';

import createStylesProps from '../../helpers/createStyledProps';

import {withLocalisation} from '../../hoc';
import {TextProps} from '../Text/Text';

export type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export interface HeadlineProps extends TextProps {
  strong?: boolean;
  size?: HeadlineSize;
}

const Headline = ({children, size = 'h1', ...rest}: HeadlineProps) => {
  const HeadlineSt = createStylesProps(size);

  return (
    <HeadlineSt $m={0} $p={0} {...rest}>
      {children}
    </HeadlineSt>
  );
};

export default withLocalisation<HeadlineProps>(Headline);
