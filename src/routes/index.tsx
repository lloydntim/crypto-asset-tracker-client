import React, {lazy} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';

// import {
//   Login,
//   Welcome,
//   Home,
//   Register,
//   Profile,
//   Forgot,
//   Verify,
//   About,
//   Reset,
//   Sample,
// } from '../pages';
// import AuthenticationRoute from './AuthenticationRoute';

const Home = lazy(() => import(/* : "home" */ '../pages/Home/Home'));
const Login = lazy(() => import(/* : "login" */ '../pages/Login/Login'));
const Register = lazy(
  () => import(/* : "register" */ '../pages/Register/Register'),
);
const Welcome = lazy(
  () => import(/* : "welcome" */ '../pages/Welcome/Welcome'),
);
const Sample = lazy(() => import(/* : "sample" */ '../pages/Sample/Sample'));
const About = lazy(() => import(/* : "about" */ '../pages/About/About'));
const Verify = lazy(() => import(/* : "verify" */ '../pages/Verify/Verify'));
const Forgot = lazy(() => import(/* : "forgot" */ '../pages/Forgot/Forgot'));
const Reset = lazy(() => import(/* : "reset" */ '../pages/Reset/Reset'));
const Profile = lazy(
  () => import(/* : "profile" */ '../pages/Profile/Profile'),
);
const AuthenticationRoute = lazy(
  () => import(/* : "authroute" */ './AuthenticationRoute'),
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
