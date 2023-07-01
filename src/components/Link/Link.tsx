import React from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';

import {LocalisationProps} from '../../hoc/withLocalisation';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

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
  <LinkSt {...rest} data-testid="link" to={to} className={`link ${className}`}>
    <Icon type={icon} />
    <Text tKey={tKey}>{children}</Text>
  </LinkSt>
);

export default Link;
