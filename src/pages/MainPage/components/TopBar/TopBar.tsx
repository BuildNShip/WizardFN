import { useState } from 'react';
import styles from './TopBar.module.css'
import { LuUploadCloud } from 'react-icons/lu'
import Modal from '../Modal/Modal';
import { preRegister, register } from '../../../../apis/authentication';

const TopBar = () => {
    const [isModalOpen, setModalOpen] = useState(true);
    const [showOTP, setShowOTP] = useState(false);

    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    return (
        <>
            {
                isModalOpen && (
                    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} >
                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                Register Now
                            </div>
                            <div className={styles.modalSubtitle}>
                                Create an account to save your workspace
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div>
                            {showOTP && <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Enter OTP
                                </div>
                                <input onChange={(e) => {
                                    setOTP(e.target.value);
                                }} className={styles.modalInput} type="number" />
                            </div>}
                            <div className={styles.modalButtonContainer}>
                                <button onClick={() => {
                                    if (!showOTP)
                                        preRegister(email);
                                    else
                                        register(email, otp)
                                    setShowOTP(true);
                                }} className={styles.modalButton}>
                                    {showOTP ? 'Verify OTP' : 'Send OTP'}
                                </button>
                            </div>
                        </div>
                    </Modal >
                )
            }
            <div className={styles.mainAppTopbar}>

                <div className={styles.topbarTabsContainer}>
                    <div className={styles.topbarTabs}>
                        <div className={styles.topbarTabActive}>
                            <span className={styles.tabType}>
                                Drafts
                            </span>
                            Untitled
                        </div>
                        <div className={styles.topbarTab}>
                            Another Tab
                        </div>
                    </div>
                    <div className={styles.topbarAddTab}>
                        +
                    </div>
                    <div className={styles.shareButton}>
                        Share
                    </div>
                </div>

                <div className={styles.topbarActions}>
                    <button className={styles.saveToWorkspace}><LuUploadCloud className={styles.saveButton} /> Save My Workspace</button>
                    <button className={styles.logoutButton} onClick={() => {
                        setModalOpen(true)
                    }}>Login</button>
                </div>
            </div>
        </>
    )
}

export default TopBar