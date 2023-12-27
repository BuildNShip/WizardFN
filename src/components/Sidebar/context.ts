import { createContext } from 'react';
import { ProjectModals, ProjectType } from './types';

interface SidebarContextType {
  projectModals: ProjectModals;
  setProjectModals: React.Dispatch<React.SetStateAction<ProjectModals>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  projects: ProjectType[];
  project: {
    id: string;
    title: string;
  };
  setProject: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
    }>
  >;
}

export const SidebarContext = createContext(<SidebarContextType>{});
