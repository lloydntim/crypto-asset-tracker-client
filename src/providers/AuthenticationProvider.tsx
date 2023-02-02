import React, {createContext, FC, ReactNode, useContext} from 'react';
import jwtDecode from 'jwt-decode';

export interface User {
  name?: string;
  id?: string;
}

interface AuthenticationContextProps {
  currentUser: () => User | null;
  setLoginToken: (token: string) => void;
}

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationContext = createContext<AuthenticationContextProps>(
  undefined,
);

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children,
}: AuthenticationProviderProps) => (
  <AuthenticationContext.Provider
    value={{
      currentUser: () => {
        const token = localStorage.getItem('token');

        return token ? jwtDecode(token) : null;
      },
      setLoginToken: (token) => localStorage.setItem('token', token),
    }}
  >
    {children}
  </AuthenticationContext.Provider>
);

export default AuthenticationProvider;

export const useAuthentication = () => useContext(AuthenticationContext);
