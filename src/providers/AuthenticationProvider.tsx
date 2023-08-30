import React, {createContext, FC, ReactNode, useContext} from 'react';
import jwtDecode from 'jwt-decode';

export interface User {
  name?: string;
  id?: string;
}

interface AuthenticationContextProps {
  currentUser: () => User;
  setLoginToken: (token: string) => void;
}

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationContext = createContext<AuthenticationContextProps>({
  currentUser: () => ({}),
  setLoginToken: () => null,
});

const AuthenticationProvider = ({children}: AuthenticationProviderProps) => (
  <AuthenticationContext.Provider
    value={{
      currentUser: () => {
        const token = localStorage.getItem('token');

        return token ? jwtDecode(token) : {};
      },
      setLoginToken: (token: string) => localStorage.setItem('token', token),
    }}
  >
    {children}
  </AuthenticationContext.Provider>
);

export default AuthenticationProvider;

export const useAuthentication = () => useContext(AuthenticationContext);
