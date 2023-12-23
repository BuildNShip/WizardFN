//React Imports
import { useState } from "react";

//Component Imports
import Modal from "../../Modal/Modal";

//Styles Import
import styles from "./RegisterOTP.module.css"

//API Calling Fuctions
import { preRegister, register } from "../../../../../apis/authentication";

const RegisterOTP = ({ isModalOpen, setModalOpen }: { isModalOpen: boolean, setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

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
            }</>
    )
}

export default RegisterOTP