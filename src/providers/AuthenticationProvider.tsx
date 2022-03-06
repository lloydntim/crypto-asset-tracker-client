import React, { createContext, FC, ReactNode, useContext } from 'react';
// import jwtDecode from 'jwt-decode';

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

const jwtDecode = (token: string): User => token === 'abcd' ? { name: 'admin', id: 'admin' } : null;

const AuthenticationContext = createContext<AuthenticationContextProps>(undefined);

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }: AuthenticationProviderProps) => {
  return (
    <AuthenticationContext.Provider value={{
      currentUser: () => jwtDecode(localStorage.getItem('token')),
      setLoginToken: (token) => localStorage.setItem('token', token),
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuthentication = () => useContext(AuthenticationContext);
