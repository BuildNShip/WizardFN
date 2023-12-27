import { ProjectModals, ProjectType } from '../components/Sidebar/types';
import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';
import toast from 'react-hot-toast';

export const getProjects = async (
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>,
) => {
  return privateGateway
    .get(buildVerse.getProjects)
    .then((response) => {
      setProjects(response.data.response.projects);
      console.log(response.data.response.projects);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createProject = async (
  title: string,
  projectModals: ProjectModals,
  setProjectModals: React.Dispatch<React.SetStateAction<ProjectModals>>,
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>,
) => {
  return privateGateway
    .post(buildVerse.createProject, {
      title,
    })
    .then((response) => {
      console.log(response.data.response);
      toast.success('Project created successfully');
      setProjectModals({
        ...projectModals,
        isCreateProjectModalOpen: false,
      });
      getProjects(setProjects);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editProject = async (
  title: string,
  id: string,
  projectModals: ProjectModals,
  setProjectModals: React.Dispatch<React.SetStateAction<ProjectModals>>,
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>,
) => {
  return privateGateway
    .put(buildVerse.editDeleteProject + id + '/edit/', {
      title,
      id,
    })
    .then((response) => {
      console.log(response.data.response);
      toast.success('Project edited successfully');
      setProjectModals({
        ...projectModals,
        isEditProjectModalOpen: false,
      });
      getProjects(setProjects);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteProject = async (
  id: string,
  projectModals: ProjectModals,
  setProjectModals: React.Dispatch<React.SetStateAction<ProjectModals>>,
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>,
) => {
  return privateGateway
    .delete(buildVerse.editDeleteProject + id + '/delete/')
    .then((response) => {
      console.log(response.data.response);
      toast.success('Project deleted successfully');
      setProjectModals({
        ...projectModals,
        isDeleteProjectModalOpen: false,
      });
      getProjects(setProjects);
    })
    .catch((error) => {
      console.log(error);
    });
};
