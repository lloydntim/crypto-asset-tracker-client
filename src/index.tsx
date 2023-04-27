import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';

import {createClient} from './graphql';
import {App} from './App';

import './localisation/i18n';

const container = document.getElementById('root');
const root = createRoot(container);

/* eslint-disable no-undef */
root.render(
  <ApolloProvider client={createClient()}>
    <App />
  </ApolloProvider>,
);
