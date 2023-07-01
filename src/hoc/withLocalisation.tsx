import React, {ReactNode, ComponentType, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
export interface LocalisationProps {
  tKey?: string;
  children?: JSX.Element | JSX.Element[] | ReactNode;
}

type LocalisationHOC = <T extends LocalisationProps>(
  Component: ComponentType<T>,
) => (props: T) => ReactElement | null;

/* eslint-disable  */
const withLocalisation: LocalisationHOC = (Component) => {
  return (props) => {
    const {t} = useTranslation();
    const {tKey = '', children = null} = props;
    const content = tKey ? t(tKey) : children;

    if (!content) return null;

    return <Component {...props}>{content}</Component>;
  };
};

export default withLocalisation;
