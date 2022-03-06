import React, { createContext, FC, ReactNode, useContext } from 'react';

export interface ClipboardData<T> {
  list: T[];
  id?: string;
}

interface ClipboardContextProps {
  get: <T>() => ClipboardData<T>;
  add: <T>(data: ClipboardData<T>) => void;
}

interface ClipboardProviderProps {
  children: ReactNode;
}

const ClipboardContext = createContext<ClipboardContextProps>(undefined);

const ClipboardProvider: FC<ClipboardProviderProps> = ({ children }: ClipboardProviderProps) => {
  return (
    <ClipboardContext.Provider value={{
      get: () => JSON.parse(sessionStorage.getItem('clipboard')) || null,
      add: (data) => sessionStorage.setItem('clipboard', JSON.stringify(data)),
    }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export default ClipboardProvider;

export const useClipboard = () => useContext(ClipboardContext);
