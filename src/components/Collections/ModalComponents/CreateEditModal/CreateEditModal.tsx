import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import Modal from '../../../../pages/MainPage/components/Modal/Modal';
import styles from './CreateEditModal.module.css';

import { useContext, useEffect, useState } from 'react';
import { CollectionsContext } from '../../context';
import { UserContext } from '../../../../pages/MainPage/context';
import {
  createCollections,
  editCollection,
} from '../../../../apis/collections';

const CreateEditModal = () => {
  const {
    collectionsModal,
    setCollectionsModal,
    collection,
    setCollection,
    setCollections,
  } = useContext(CollectionsContext);

  const { currentProject } = useContext(UserContext);

  const [modalType, setModalType] = useState('');

  useEffect(() => {
    if (collectionsModal.isCreateCollectionModalOpen) {
      setModalType('isCreateCollectionModalOpen');
    } else if (collectionsModal.isEditCollectionModalOpen) {
      setModalType('isEditCollectionModalOpen');
    }
  }, [collectionsModal]);

  const collectionSubmitHandler = () => {
    if (collectionsModal.isCreateCollectionModalOpen) {
      console.log('Test');
      createCollections(
        currentProject.id,
        collection.title,
        setCollections,
        collectionsModal,
        setCollectionsModal,
      );
    } else if (collectionsModal.isEditCollectionModalOpen) {
      editCollection(
        currentProject.id,
        collection.id,
        collection.title,
        setCollections,
        collectionsModal,
        setCollectionsModal,
      );
    }
  };

  return (
    <>
      <Modal
        modalTriggers={collectionsModal}
        setModalTriggers={setCollectionsModal}
        Modalname={modalType}
      >
        <div
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              collectionSubmitHandler();
            }
          }}
          className={styles.modalContent}
        >
          <div className={styles.modalTitle}>
            {collectionsModal.isCreateCollectionModalOpen ? 'Create' : 'Edit'}{' '}
            Collections
          </div>
          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputLabel}>
              Collection Title<span>*</span>
            </div>
            <input
              autoFocus={true}
              placeholder="Enter your collection title"
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
              buttonText={
                collectionsModal.isCreateCollectionModalOpen
                  ? 'Create Collection'
                  : 'Edit Collection'
              }
              onClick={() => {
                collectionSubmitHandler();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEditModal;
