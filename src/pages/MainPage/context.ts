import { createContext } from 'react';
import { ProjectType } from '../../components/Sidebar/types';

interface userContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  currentProject: ProjectType;
  setCurrentProject: (currentProject: ProjectType) => void;
  currentCollection: Collection;
  setCurrentCollection: (currentCollection: Collection) => void;
}

interface APIContextType {
  currentEndpoints: APIData;
  setCurrentEndpoints: (apiData: APIData) => void;
}

export const UserContext = createContext(<userContextType>{});

export const APIContext = createContext(<APIContextType>{});
