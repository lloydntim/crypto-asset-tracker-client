import React, {Suspense} from 'react';
import {BrowserRouter as Router, RouterProvider} from 'react-router-dom';
import {AuthenticationProvider, ClipboardProvider} from './providers';

import {router} from './routes';
import {Message} from './components';

export const App = () => {
  return (
    <AuthenticationProvider>
      <ClipboardProvider>
        <Suspense
          fallback={<Message type="info" tKey="common:message.loading.text" />}
        >
          <RouterProvider router={router} />
        </Suspense>
      </ClipboardProvider>
    </AuthenticationProvider>
  );
};
