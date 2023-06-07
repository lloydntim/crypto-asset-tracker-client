import React from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';

import {
  Home,
  Login,
  Register,
  Welcome,
  Sample,
  About,
  Verify,
  Forgot,
  Reset,
  Profile,
} from '../pages';
import AuthenticationRoute from './AuthenticationRoute';

export {AuthenticationRoute};

export default () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'welcome',
      element: <AuthenticationRoute component={<Welcome />} />,
    },
    {
      path: 'sample',
      element: <AuthenticationRoute component={<Sample />} />,
    },
    {
      path: 'about',
      element: <About />,
    },
    {
      path: 'verify',
      element: <Verify />,
    },
    {
      path: 'forgot',
      element: <Forgot />,
    },
    {
      path: 'reset',
      element: <Reset />,
    },
  ];
  return useRoutes(routes);
};
