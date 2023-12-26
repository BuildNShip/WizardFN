import { createContext } from 'react';

interface userContextType {
  isLoggedIn: boolean;
  email: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}

export const UserContext = createContext(<userContextType>{});
