import { ProjectModals } from '../../../../components/Sidebar/types';
import { ModalTriggersType } from '../TopBar/types';
import styles from './Modal.module.css'; // Create a separate CSS file for styling
import { IoClose } from 'react-icons/io5';
const Modal = ({
  modalTriggers,
  setModalTriggers,
  Modalname,
  children,
}: {
  modalTriggers: any
  setModalTriggers: any
  Modalname: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      {modalTriggers[Modalname as keyof ModalTriggersType] && (
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
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
