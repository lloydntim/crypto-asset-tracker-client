import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import {ErrorBoundary} from 'react-error-boundary';
import GlobalCSS from './styles';

import {createClient} from './graphql';
import {App} from './App';

import {Message} from './components';

import './locales/i18n';

const container = document.getElementById('root') as Element;
const root = createRoot(container);

const fallbackRender = () => {
  return <Message tKey="common:message.error.text" />;
};

/* eslint-disable no-undef */
root.render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <ApolloProvider client={createClient()}>
      <GlobalCSS />
      <App />
    </ApolloProvider>
    ,
  </ErrorBoundary>,
);
