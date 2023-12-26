import React from 'react';
import { useState } from 'react';

import styles from './CreateEditModal.module.css';
import Modal from '../../../../pages/MainPage/components/Modal/Modal';
import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import { ProjectModals, ProjectType } from '../../types';
import { createProject } from '../../../../apis/projects';

const CreateEditModal = ({
  projectModals,
  setProjectModals,
  setProjects,
}: {
  projectModals: ProjectModals;
  setProjectModals: React.Dispatch<React.SetStateAction<ProjectModals>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}) => {
  const [projectTitle, setProjectTitle] = useState('');
  return (
    <>
      <Modal
        modalTriggers={projectModals}
        setModalTriggers={setProjectModals}
        Modalname="isCreateProjectModalOpen"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>Create Projet</div>
          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputLabel}>
              Project Title<span>*</span>
            </div>
            <input
              placeholder="Enter your project title"
              onChange={(e) => setProjectTitle(e.target.value)}
              className={styles.modalInput}
              type="text"
              value={projectTitle}
            />
          </div>
          <div className={styles.modalButtonContainer}>
            <PrimaryButton
              onClick={() => {
                createProject(projectTitle, setProjectModals, setProjects);
              }}
              buttonText="Create Project"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEditModal;
