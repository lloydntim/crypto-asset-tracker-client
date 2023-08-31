import {TOptions} from 'i18next';
import React, {ReactNode, ComponentType} from 'react';
import {useTranslation} from 'react-i18next';
export interface LocalisationProps {
  tKey?: string;
  tOptions?: TOptions;
  children?: ReactNode;
}

type LocalisationHOC = <T extends LocalisationProps>(
  // any is used here to allow i18n translation key properties
  // to be excluded from DOM element to avoid erros
  Component: ComponentType<any>,
) => (props: T) => ReactNode;

/* eslint-disable  */
const withLocalisation: LocalisationHOC = (Component) => {
  return ({tKey = '', tOptions = {}, children, ...rest}) => {
    const {t} = useTranslation();
    const content = tKey ? t(tKey, tOptions) : children;

    if (!content) return null;

    return <Component {...rest}>{content}</Component>;
  };
};

export default withLocalisation;
