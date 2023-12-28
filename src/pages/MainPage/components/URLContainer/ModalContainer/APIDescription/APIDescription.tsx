import styles from './APIDescription.module.css';
import Modal from '../../../Modal/Modal';
import PrimaryButton from '../../../Buttons/PrimaryButton';

const APIDescription = ({
  modalTriggers,
  setModalTriggers,
  requestDescription,
  setRequestDescription,
}: {
  modalTriggers: URLContainerProps;
  setModalTriggers: React.Dispatch<React.SetStateAction<URLContainerProps>>;
  requestDescription: string;
  setRequestDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Modal
        modalTriggers={modalTriggers}
        setModalTriggers={setModalTriggers}
        Modalname="isAPIDescriptionModalOpen"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>Create Project</div>
          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputLabel}>
              API Description<span>*</span>
            </div>
            <input
              placeholder="Enter the API Description"
              className={styles.modalInput}
              type="text"
              onChange={(e) => setRequestDescription(e.target.value)}
              value={requestDescription}
            />
          </div>
          <div className={styles.modalButtonContainer}>
            <PrimaryButton buttonText="Save" onClick={() => {}} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default APIDescription;
