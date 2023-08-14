import {TOptions} from 'i18next';
import React, {ReactNode, ComponentType, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
export interface LocalisationProps {
  tKey?: string;
  tOptions?: TOptions;
  children?: JSX.Element | JSX.Element[] | ReactNode;
}

type LocalisationHOC = <T extends LocalisationProps>(
  Component: ComponentType<T>,
) => (props: T) => ReactElement | null;

/* eslint-disable  */
const withLocalisation: LocalisationHOC = (Component) => {
  return (props) => {
    const {t} = useTranslation();
    const {tKey = '', tOptions = {}, children = null} = props;
    const content = tKey ? t(tKey, tOptions) : children;

    if (!content) return null;

    return <Component {...props}>{content}</Component>;
  };
};

export default withLocalisation;
