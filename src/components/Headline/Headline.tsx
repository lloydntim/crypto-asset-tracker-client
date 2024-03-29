import React from 'react';

import createStylesProps from '../../helpers/createStyledProps';

import {withLocalisation} from '../../hoc';
import {TextProps} from '../Text/Text';

export type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export interface HeadlineProps extends TextProps {
  strong?: boolean;
  size?: HeadlineSize;
}
const headlineMapper = {
  h1: createStylesProps('h1'),
  h2: createStylesProps('h2'),
  h3: createStylesProps('h3'),
  h4: createStylesProps('h4'),
  h5: createStylesProps('h5'),
};
const Headline = ({children, size = 'h1', ...rest}: HeadlineProps) => {
  const HeadlineSt = headlineMapper[size];

  return (
    <HeadlineSt $m={0} $p={0} {...rest}>
      {children}
    </HeadlineSt>
  );
};

export default withLocalisation<HeadlineProps>(Headline);
