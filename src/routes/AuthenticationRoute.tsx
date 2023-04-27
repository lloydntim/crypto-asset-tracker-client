import React, {FC, ReactElement} from 'react';
import {useLocation, Navigate} from 'react-router-dom';

import {useAuthentication} from '../providers/AuthenticationProvider';

interface AunthenticationRouteProps {
  component: ReactElement;
}

const AuthenticationRoute: FC<AunthenticationRouteProps> = ({
  component,
}): ReactElement => {
  const location = useLocation();
  const {currentUser} = useAuthentication();

  console.log('currentUser', currentUser());

  const state = location.state as {from: string};
  const path = state?.from || '/';
  console.log('path', state);

  return currentUser() ? component : <Navigate to={path} replace />;
};

export default AuthenticationRoute;
