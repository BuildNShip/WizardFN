import { useContext, useEffect, useState } from 'react';

import styles from './CreateEditModal.module.css';
import Modal from '../../../../pages/MainPage/components/Modal/Modal';
import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import { createProject, editProject } from '../../../../apis/projects';
import { SidebarContext } from '../../context';

const CreateEditModal = () => {
  const { projectModals, setProjectModals, setProjects, project, setProject } =
    useContext(SidebarContext);

  const [modalType, setModalType] = useState('');

  useEffect(() => {
    if (projectModals.isCreateProjectModalOpen) {
      setModalType('isCreateProjectModalOpen');
    } else if (projectModals.isEditProjectModalOpen) {
      setModalType('isEditProjectModalOpen');
    } else if (projectModals.isDeleteProjectModalOpen) {
      setModalType('isDeleteProjectModalOpen');
    }
  }, [projectModals]);

  return (
    <>
      <Modal
        modalTriggers={projectModals}
        setModalTriggers={setProjectModals}
        Modalname={modalType}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>Create Projet</div>
          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputLabel}>
              Project Title<span>*</span>
            </div>
            <input
              placeholder="Enter your project title"
              onChange={(e) => {
                setProject({
                  ...project,
                  title: e.target.value,
                });
              }}
              className={styles.modalInput}
              type="text"
              value={project.title}
            />
          </div>
          <div className={styles.modalButtonContainer}>
            <PrimaryButton
              onClick={() => {
                if (projectModals.isCreateProjectModalOpen)
                  createProject(
                    project.title,
                    projectModals,
                    setProjectModals,
                    setProjects,
                  );
                else if (projectModals.isEditProjectModalOpen)
                  editProject(
                    project.title,
                    project.id,
                    projectModals,
                    setProjectModals,
                    setProjects,
                  );
              }}
              buttonText={
                projectModals.isCreateProjectModalOpen
                  ? 'Create Project'
                  : 'Edit Project'
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEditModal;
