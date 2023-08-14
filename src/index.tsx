import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import GlobalCSS from './styles';

import {createClient} from './graphql';
import {App} from './App';

import './locales/i18n';

const container = document.getElementById('root') as Element;
const root = createRoot(container);

/* eslint-disable no-undef */
root.render(
  <ApolloProvider client={createClient()}>
    <GlobalCSS />
    <App />
  </ApolloProvider>,
);
