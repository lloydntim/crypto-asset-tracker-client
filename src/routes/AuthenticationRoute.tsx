import React, {ReactNode} from 'react';
import {useLocation, Navigate} from 'react-router-dom';

import {useAuthentication} from '../providers/AuthenticationProvider';

interface AunthenticationRouteProps {
  component: ReactNode;
}

const AuthenticationRoute = ({component}: AunthenticationRouteProps) => {
  const location = useLocation();
  const {currentUser} = useAuthentication();
  const state = location.state as {from: string};
  const path = state?.from || '/';

  return currentUser().id ? component : <Navigate to={path} replace />;
};

export default AuthenticationRoute;
