import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {AuthenticationProvider, ClipboardProvider} from './providers';

import Routes from './routes';

export const App = () => {
  return (
    <AuthenticationProvider>
      <ClipboardProvider>
        <Router>
          <Routes />
        </Router>
      </ClipboardProvider>
    </AuthenticationProvider>
  );
};
