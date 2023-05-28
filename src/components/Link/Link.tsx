import React, {FC, ReactElement} from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {Icon, Text} from '../../components';

import {withLocalisation} from '../../hoc';
import {LocalisationProps} from '../../hoc/withLocalisation';

// import './Link.scss';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

export interface LinkProps extends LocalisationProps, StyledProps {
  className?: string;
  icon?: string;
  to: string;
}

const LinkSt = createStylesProps(ReactRouterLink);
const Link: FC<LinkProps> = ({
  icon = '',
  children,
  className = '',
  to = '',
  tKey = '',
  ...rest
}): ReactElement => (
  <LinkSt {...rest} to={to} className={`link ${className}`}>
    <Icon type={icon} />
    <Text tKey={tKey}>{children}</Text>
  </LinkSt>
);

export default withLocalisation<LinkProps>(Link);
