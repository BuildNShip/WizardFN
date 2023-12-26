import { useEffect, useState } from 'react';

import styles from './Sidebar.module.css';
import { getProjects } from '../../apis/projects';
import { ProjectModals, ProjectType } from './types';
import CreateEditModal from './ModalComponents/CreateEditModal/CreateEditModal';

const Sidebar = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    getProjects(setProjects);
  }, []);

  const [projectModals, setProjectModals] = useState<ProjectModals>({
    isCreateProjectModalOpen: false,
  });

  return (
    <>
      <CreateEditModal
        projectModals={projectModals}
        setProjectModals={setProjectModals}
        setProjects={setProjects}
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
                <div className={styles.project}>
                  {project.title.substring(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
