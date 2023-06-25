import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';

import {createClient} from './graphql';
import {App} from './App';

import './locales/i18n';

const container = document.getElementById('root') as Element;
const root = createRoot(container);

/* eslint-disable no-undef */
root.render(
  <ApolloProvider client={createClient()}>
    <App />
  </ApolloProvider>,
);
