import { useContext, useEffect, useState } from 'react';

import styles from './Sidebar.module.css';
import { deleteProject, getProjects } from '../../apis/projects';
import { ProjectModals, ProjectType } from './types';
import CreateEditModal from './ModalComponents/CreateEditModal/CreateEditModal';
import RightClickMenu from '../RightClickMenu/RightClickMenu';
import { SidebarContext } from './context';
import BinaryPopup from './ModalComponents/BinaryPopup/BinaryPopup';
import { UserContext } from '../../pages/MainPage/context';

const Sidebar = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [points, setPoints] = useState({ top: 0, left: 0 });

  const { setCurrentProject } = useContext(UserContext);

  useEffect(() => {
    getProjects(setProjects);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      projects.filter((project) => {
        if (project.selected) {
          setCurrentProject(project);
        }
      });
    }
  }, [projects]);

  const [projectModals, setProjectModals] = useState<ProjectModals>({
    isCreateProjectModalOpen: false,
    isEditProjectModalOpen: false,
    isDeleteProjectModalOpen: false,
  });

  const [rightClickMenu, setRightClickMenu] = useState(false);
 const [project, setProject] = useState({
    title: '',
    id: '',
  });
 
  useEffect(() => {
    const handleClick = () => {
      setRightClickMenu(false);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: 'Rename Project',
      onClick: () => {
        setProjectModals({
          ...projectModals,
          isEditProjectModalOpen: true,
        });
      },
    },
    {
      label: 'Duplicate Project',
    },
    {
      label: 'Delete Project',
      onClick: () => {
        setProjectModals({
          ...projectModals,
          isDeleteProjectModalOpen: true,
        });
      },
    },
  ];

  return (
    <SidebarContext.Provider
      value={{
        projectModals,
        setProjectModals,
        setProjects,
        projects,
        project,
        setProject,
      }}
    >
      <>
        <CreateEditModal />
        <BinaryPopup
          onClick={() => {
            deleteProject(
              project.id,
              projectModals,
              setProjectModals,
              setProjects,
            );
          }}
          content={`Are you sure you want to delete ${project.title}?`}
          buttonText="Delete Project"
          Modalname="isDeleteProjectModalOpen"
          onClickCancel={() => {
            setProjectModals({
              ...projectModals,
              isDeleteProjectModalOpen: false,
            });
          }}
        />
        <div className={styles.projectsSideBarContainer}>
          <div className={styles.projectsSideBar}>
            <p className={styles.projectsSideBarHeading}>Projects</p>

            <div className={styles.projectsContainer}>
              <div className={styles.projects}>
                <div
                  className={styles.addProjects}
                  onClick={() => {
                    setProjectModals({
                      ...projectModals,
                      isCreateProjectModalOpen: true,
                    });
                  }}
                >
                  <p className={styles.addProjectsPlus}>+</p>
                </div>

                {projects.map((project) => (
                  <div className={styles.projectContainer}>
                    <div
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setRightClickMenu(true);
                        setPoints({ top: e.clientY, left: e.clientX });

                        setProject({
                          title: project.title,
                          id: project.id,
                        });
                      }}
                      className={styles.project}
                      onClick={() => {
                        setCurrentProject(project);

                        projects.map((project) => {
                          project.selected = false;
                        });

                        project.selected = true;
                      }}
                    >
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                    {project.selected && (
                      <span className={styles.activeDot}></span>
                    )}
                  </div>
                ))}

                {rightClickMenu && (
                  <div
                    className={styles.rightClickMenuContainer}
                    style={{ top: points.top, left: points.left }}
                  >
                    <RightClickMenu menuItems={menuItems} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
