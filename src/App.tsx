import React, {Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthenticationProvider, ClipboardProvider} from './providers';

import Routes from './routes';
import {Message} from './components';

export const App = () => {
  return (
    <AuthenticationProvider>
      <ClipboardProvider>
        {/*     <Suspense
          fallback={<Message type="info" tKey="common:message.loading.text" />}
        > */}
        <Router>
          <Routes />
        </Router>
        {/*  </Suspense> */}
      </ClipboardProvider>
    </AuthenticationProvider>
  );
};
