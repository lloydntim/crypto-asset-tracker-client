/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './en/common.json';
import homeEn from './en/home.json';
import loginEn from './en/login.json';
import registerEn from './en/register.json';
import portfolioEn from './en/portfolio.json';
import profileEn from './en/profile.json';
import resetEn from './en/reset.json';
import verifyEn from './en/verify.json';
import aboutEn from './en/about.json';
import forgotEn from './en/forgot.json';
import notfoundEn from './en/notfound.json';

import commonDe from './de/common.json';
import homeDe from './de/home.json';
import loginDe from './de/login.json';
import registerDe from './de/register.json';
import portfolioDe from './de/portfolio.json';
import profileDe from './de/profile.json';
import resetDe from './de/reset.json';
import verifyDe from './de/verify.json';
import aboutDe from './de/about.json';
import forgotDe from './de/forgot.json';
import notfoundDe from './de/notfound.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: 'common',
    home: 'home',
    portfolio: 'portfolio',
    login: 'login',
    register: 'register',
    reset: 'reset',
    verify: 'verify',
    about: 'about',
    forgot: 'forgot',
    notfound: 'notfound',
  },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    returnNull: false,
    resources: {
      en: {
        common: commonEn,
        home: homeEn,
        login: loginEn,
        register: registerEn,
        portfolio: portfolioEn,
        profile: profileEn,
        reset: resetEn,
        verify: verifyEn,
        about: aboutEn,
        forgot: forgotEn,
        notfound: notfoundEn,
      },
      de: {
        common: commonDe,
        home: homeDe,
        login: loginDe,
        register: registerDe,
        portfolio: portfolioDe,
        profile: profileDe,
        reset: resetDe,
        verify: verifyDe,
        about: aboutDe,
        forgot: forgotDe,
        notfound: notfoundDe,
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
      'home',
      'portfolio',
      'login',
      'profile',
      'reset',
      'register',
      'verify',
      'about',
      'forgot',
      'notfound',
    ],
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
