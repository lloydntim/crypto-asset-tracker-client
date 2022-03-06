import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { Login, Welcome } from '../pages';
import AuthenticationRoute from './AuthenticationRoute';

export { AuthenticationRoute };

export default () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'welcome',
      element: <AuthenticationRoute component={<Welcome />} />,
    },
  ];
  return useRoutes(routes);
}
