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
  requestDescription: APIData;
  setRequestDescription: (apiData: APIData) => void;
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
              onChange={(e) => {
                setRequestDescription({
                  ...requestDescription,
                  endPointData: {
                    ...requestDescription.endPointData,
                    method: e.target.value,
                  },
                });
              }}
              value={requestDescription.endPointData.description}
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
