import React, {createContext, ReactNode, useContext} from 'react';

export interface ClipboardData<T> {
  list: T[];
  id?: string;
}

interface ClipboardContextProps {
  get: <T>() => ClipboardData<T>;
  add: <T>(data?: ClipboardData<T>) => void;
}

interface ClipboardProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_CLIPBOARD_KEY = 'clipboard';
const ClipboardContext = createContext<ClipboardContextProps>({
  get: () => ({list: [], id: ''}),
  add: () => null,
});

const ClipboardProvider = ({children}: ClipboardProviderProps) => {
  return (
    <ClipboardContext.Provider
      value={{
        get: () =>
          JSON.parse(
            sessionStorage.getItem(LOCAL_STORAGE_CLIPBOARD_KEY) as string,
          ) || null,
        add: (data) =>
          sessionStorage.setItem(
            LOCAL_STORAGE_CLIPBOARD_KEY,
            JSON.stringify(data),
          ),
      }}
    >
      {children}
    </ClipboardContext.Provider>
  );
};

export default ClipboardProvider;

export const useClipboard = () => useContext(ClipboardContext);
