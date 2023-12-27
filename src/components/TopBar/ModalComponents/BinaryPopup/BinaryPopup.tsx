import { IoClose } from 'react-icons/io5';
import styles from './BinaryPopup.module.css';
import { ModalTriggersType } from '../../types';


import { useContext } from 'react';
import { ModalContext } from '../../context';
import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import SecondaryButton from '../../../../pages/MainPage/components/Buttons/SecondaryButton';

const BinaryPopup = ({
  onClick,
  content,
  buttonText,
  Modalname,
  onClickCancel,
}: {
  onClick: () => void;
  content: string;
  buttonText: string;
  Modalname: string;
  onClickCancel?: () => void;
}) => {
  const { modalTriggers, setModalTriggers } = useContext(ModalContext);

  return (
    <>
      {modalTriggers[Modalname as keyof ModalTriggersType] && (
        <div>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalTopbar}>
                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setModalTriggers({
                      ...modalTriggers,
                      [Modalname]: false,
                    });
                  }}
                >
                  <IoClose size={18} />
                </button>

                <hr className={styles.horizonalLine} />
              </div>

              <div className={styles.modalContent}>
                <div className={styles.modalTitle}>Oh Snap!</div>
                <div className={styles.modalInputContainer}>
                  <div className={styles.modalInputLabel}>{content}</div>
                </div>
                <div className={styles.modalButtonContainer}>
                  <PrimaryButton
                    buttonText={buttonText}
                    onClick={() => {
                      onClick();
                    }}
                  />

                  {onClickCancel && (
                    <SecondaryButton
                      buttonText="Don't Merge"
                      onClick={() => {
                        onClickCancel();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BinaryPopup;
