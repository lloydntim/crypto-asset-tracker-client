import React, {lazy} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';

const Home = lazy(
  () => import(/* webpackChunkName: "home" */ '../pages/Home/Home'),
);
const Login = lazy(
  () => import(/* webpackChunkName: "login" */ '../pages/Login/Login'),
);
const Register = lazy(
  () => import(/* webpackChunkName: "register" */ '../pages/Register/Register'),
);
const Welcome = lazy(
  () => import(/* webpackChunkName: "welcome" */ '../pages/Welcome/Welcome'),
);
const Sample = lazy(
  () => import(/* webpackChunkName: "sample" */ '../pages/Sample/Sample'),
);
const About = lazy(
  () => import(/* webpackChunkName: "about" */ '../pages/About/About'),
);
const Verify = lazy(
  () => import(/* webpackChunkName: "verify" */ '../pages/Verify/Verify'),
);
const Forgot = lazy(
  () => import(/* webpackChunkName: "forgot" */ '../pages/Forgot/Forgot'),
);
const Reset = lazy(
  () => import(/* webpackChunkName: "reset" */ '../pages/Reset/Reset'),
);
const Profile = lazy(
  () => import(/* webpackChunkName: "profile" */ '../pages/Profile/Profile'),
);
const AuthenticationRoute = lazy(
  () => import(/* webpackChunkName: "authroute" */ './AuthenticationRoute'),
);

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
