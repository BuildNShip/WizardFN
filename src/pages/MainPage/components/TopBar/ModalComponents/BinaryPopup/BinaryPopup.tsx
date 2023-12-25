import { IoClose } from 'react-icons/io5'
import styles from './BinaryPopup.module.css'
import SecondaryButton from '../../../Buttons/SecondaryButton'
import PrimaryButton from '../../../Buttons/PrimaryButton'

const BinaryPopup = () => {
    return (
        <>
            <div>
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalTopbar}>
                            <button className={styles.closeButton}
                            >
                                <IoClose size={18} />
                            </button>

                            <hr className={styles.horizonalLine} />
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                Login
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    It seems you are facing troble while trying to login, why don't you try with OTP or reset your password
                                    with One-Click.
                                </div>

                            </div>
                            <div className={styles.modalButtonContainer}>
                                <PrimaryButton ButtonText="Login with OTP" onClick={() => { }} />

                                <SecondaryButton ButtonText="Reset Password" onClick={() => { }} />
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default BinaryPopup