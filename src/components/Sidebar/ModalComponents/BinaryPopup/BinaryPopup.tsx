import { IoClose } from 'react-icons/io5';
import styles from './BinaryPopup.module.css';

import { useContext } from 'react';
import { SidebarContext } from '../../context';
import PrimaryButton from '../../../../pages/MainPage/components/Buttons/PrimaryButton';
import SecondaryButton from '../../../../pages/MainPage/components/Buttons/SecondaryButton';
import { ProjectModals } from '../../types';

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
  const { projectModals, setProjectModals } = useContext(SidebarContext);

  return (
    <>
      {projectModals[Modalname as keyof ProjectModals] && (
        <div>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalTopbar}>
                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setProjectModals({
                      ...projectModals,
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
                      buttonText="Don't Delete"
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
