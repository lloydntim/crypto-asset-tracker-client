import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './en/common.json';
import loginEn from './en/login.json';
import registerEn from './en/register.json';
import welcomeEn from './en/welcome.json';

import commonDe from './de/common.json';
import loginDe from './de/login.json';
import registerDe from './de/register.json';
import welcomeDe from './de/welcome.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: 'common',
    welcome: 'welcome',
    login: 'login',
    register: 'register',
  },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        common: commonEn,
        login: loginEn,
        register: registerEn,
        welcome: welcomeEn,
      },
      de: {
        common: commonDe,
        login: loginDe,
        register: registerDe,
        welcome: welcomeDe,
      },
    },
    detection: {
      order: [
        'cookie',
        'navigator',
        'localStorage',
        'querystring',
        'htmlTag',
        'path',
        'subdomain',
      ],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage', 'cookie'],
    },
    ns: ['common', 'welcome', 'login'],
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
