import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import Modal from '../../../../pages/MainPage/components/Modal/Modal';
import styles from './CreateEditModal.module.css';

import { useContext } from 'react';
import { CollectionsContext } from '../../context';
import { UserContext } from '../../../../pages/MainPage/context';
import { createCollections } from '../../../../apis/collections';

const CreateEditModal = () => {
  const { collectionsModal, setCollectionsModal, collection, setCollection } =
    useContext(CollectionsContext);

  const { currentProject } = useContext(UserContext);

  return (
    <>
      <Modal
        modalTriggers={collectionsModal}
        setModalTriggers={setCollectionsModal}
        Modalname="isCreateCollectionModalOpen"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>Create Collections</div>
          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputLabel}>
              Collection Title<span>*</span>
            </div>
            <input
              placeholder="Enter your project title"
              className={styles.modalInput}
              type="text"
              value={collection.title}
              onChange={(e) => {
                setCollection({
                  ...collection,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className={styles.modalButtonContainer}>
            <PrimaryButton
              buttonText="Create Collection"
              onClick={() => {
                if (collectionsModal.isCreateCollectionModalOpen) {
                  createCollections(
                    currentProject.id,
                    collection.title,
                    setCollection,
                    collectionsModal,
                    setCollectionsModal,
                  );
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEditModal;
