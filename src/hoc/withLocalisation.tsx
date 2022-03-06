import React, { ReactNode, ComponentType, ReactElement } from 'react';

export interface LocalisationProps {
  i18n?: string;
  children?: ReactNode;
}

type LocalisationHOC = <T extends LocalisationProps>(Component: ComponentType<T>) => (props: T) => ReactElement;

/* eslint-disable  */
const withLocalisation: LocalisationHOC = (Component) => {
  return (props) => {
    const { i18n, children } = props;
    const content = i18n || children;

    if (!content) return null;

    return <Component {...props}>{content}</Component>
  };
};

export default withLocalisation;
