import React from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';

import withLocalisation from '../../hoc/withLocalisation';
import {LocalisationProps} from '../../hoc/withLocalisation';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Box from '../Box/Box';

export interface LinkProps extends LocalisationProps, StyledProps {
  className?: string;
  icon?: string;
  to: string;
}

const LinkSt = createStylesProps(ReactRouterLink);

const Link = ({
  icon = '',
  children,
  className = '',
  to = '',
  tKey = '',
  ...rest
}: LinkProps) => (
  <LinkSt data-testid="link" to={to} className={`link ${className}`}>
    <Box {...rest}>
      <Icon type={icon} />
      <Text tKey={tKey}>{children}</Text>
      {children}
    </Box>
  </LinkSt>
);

export default withLocalisation<LinkProps>(Link);
