import { useEffect, useState } from 'react';

import styles from './Sidebar.module.css';
import { getProjects } from '../../apis/projects';
import { ProjectModals, ProjectType } from './types';
import CreateEditModal from './ModalComponents/CreateEditModal/CreateEditModal';
import RightClickMenu from '../RightClickMenu/RightClickMenu';
import { SidebarContext } from './context';

const Sidebar = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [points, setPoints] = useState({ top: 0, left: 0 });

  useEffect(() => {
    getProjects(setProjects);
  }, []);

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
                  >
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                ))}

                {rightClickMenu && (
                  <div
                    className={styles.rightClickMenuContainer}
                    style={{ top: points.top, left: points.left }}
                  >
                    <RightClickMenu />
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
