import React, {lazy} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Welcome = lazy(() => import('../pages/Welcome/Welcome'));
const About = lazy(() => import('../pages/About/About'));
const Verify = lazy(() => import('../pages/Verify/Verify'));
const Forgot = lazy(() => import('../pages/Forgot/Forgot'));
const Reset = lazy(() => import('../pages/Reset/Reset'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const AuthenticationRoute = lazy(() => import('./AuthenticationRoute'));

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
      path: 'about',
      element: <About />,
    },
    {
      path: 'verify/:token',
      element: <Verify />,
    },
    {
      path: 'forgot',
      element: <Forgot />,
    },
    {
      path: 'reset/:token',
      element: <Reset />,
    },
  ];
  return useRoutes(routes);
};
