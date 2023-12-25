import { IoClose } from 'react-icons/io5'
import styles from './BinaryPopup.module.css'
import PrimaryButton from '../../../Buttons/PrimaryButton'
import { ModalTriggersType } from '../../types';

const BinaryPopup = ({
    onClick,
    content,
    buttonText,
    modalTriggers,
    setModalTriggers,
    Modalname

}: {
    onClick: () => void;
    content: string;
    buttonText: string;
    modalTriggers: ModalTriggersType;
    setModalTriggers: (modalTriggers: ModalTriggersType) => void;
    Modalname: string;
}) => {
    return (
        <>
            {modalTriggers[Modalname as keyof ModalTriggersType] && <div>
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalTopbar}>
                            <button className={styles.closeButton}
                                onClick={() => {
                                    setModalTriggers({
                                        ...modalTriggers,
                                        [Modalname]: false,
                                    })
                                }}
                            >
                                <IoClose size={18} />
                            </button>

                            <hr className={styles.horizonalLine} />
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                Oh Snap!
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    {content}
                                </div>

                            </div>
                            <div className={styles.modalButtonContainer}>
                                <PrimaryButton ButtonText={buttonText} onClick={() => { onClick() }} />

                                {/* <SecondaryButton ButtonText="Reset Password" onClick={() => { }} /> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div >}
        </>
    )
}

export default BinaryPopup