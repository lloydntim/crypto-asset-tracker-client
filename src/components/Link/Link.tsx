import React, { FC, ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Icon, Text } from '../../components';

import { withLocalisation } from '../../hoc';
import { LocalisationProps } from '../../hoc/withLocalisation';

import './Link.scss';

export interface LinkProps extends LocalisationProps {
  className?: string;
  icon?: string;
  to: string;
}

const Link: FC<LinkProps> = ({
  icon = '',
  children,
  className = '',
  to = '',
  tKey = '',
}): ReactElement => (
  <ReactRouterLink to={to} className={`link ${className}`}>
    <Icon type={icon} />
    <Text tKey={tKey}>{children}</Text>
  </ReactRouterLink>
);

export default withLocalisation<LinkProps>(Link);
