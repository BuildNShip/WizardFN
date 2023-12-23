import styles from './Modal.module.css'; // Create a separate CSS file for styling
import { IoClose } from "react-icons/io5";
const Modal = ({ isModalOpen, setModalOpen, children }: { isModalOpen: boolean, setModalOpen: (isOpen: boolean) => void, children: React.ReactNode }) => {
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            <IoClose size={18}/>
                        </button>
                        <div className={styles.modalContent}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
