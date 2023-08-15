import React from 'react';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import {withLocalisation} from '../../hoc';
import {LocalisationProps} from '../../hoc/withLocalisation';

interface SpanProps extends LocalisationProps, StyledProps {
  className?: string;
}

const SpanSt = createStylesProps('span');

const Span = ({children, ...rest}: SpanProps) => {
  return <SpanSt {...rest}>{children}</SpanSt>;
};
export default withLocalisation<SpanProps>(Span);
