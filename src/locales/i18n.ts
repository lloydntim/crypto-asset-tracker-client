/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './en/common.json';
import loginEn from './en/login.json';
import registerEn from './en/register.json';
import welcomeEn from './en/welcome.json';
import profileEn from './en/profile.json';
import resetEn from './en/reset.json';
import verifyEn from './en/verify.json';
import aboutEn from './en/about.json';

import commonDe from './de/common.json';
import loginDe from './de/login.json';
import registerDe from './de/register.json';
import welcomeDe from './de/welcome.json';
import profileDe from './de/profile.json';
import resetDe from './de/reset.json';
import verifyDe from './de/verify.json';
import aboutDe from './de/about.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: 'common',
    welcome: 'welcome',
    login: 'login',
    register: 'register',
    reset: 'reset',
    verify: 'verify',
    about: 'about',
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
        profile: profileEn,
        reset: resetEn,
        verify: verifyEn,
        about: aboutEn,
      },
      de: {
        common: commonDe,
        login: loginDe,
        register: registerDe,
        welcome: welcomeDe,
        profile: profileDe,
        reset: resetDe,
        verify: verifyDe,
        about: aboutDe,
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
    ns: [
      'common',
      'welcome',
      'login',
      'profile',
      'reset',
      'register',
      'verify',
      'about',
    ],
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
