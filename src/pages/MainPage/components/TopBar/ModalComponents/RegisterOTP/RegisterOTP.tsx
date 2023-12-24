//React Imports
import React, { useState } from "react";

//Component Imports
import Modal from "../../../Modal/Modal";

//Styles Import
import styles from "./RegisterOTP.module.css"

//API Calling Fuctions
import { preRegister, register } from "../../../../../../apis/authentication";
import { ModalTriggersType } from "../../types";


const RegisterOTP = ({ modalTriggers, setModalTriggers, Modalname }: {
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string
}) => {

    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    
    return (
        <>
            {
                modalTriggers[Modalname as keyof ModalTriggersType] && (
                    <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
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
                            <p onClick={() => {
                                setModalTriggers({
                                    ...modalTriggers,
                                    isRegisterModalOpen: false,
                                    isLoginModalOpen: true,
                                    isForgetPasswordModalOpen: false
                                })
                            }} className={styles.subText}>Already have a Account? Login</p>
                        </div>
                    </Modal>
                )
            }</>
    )
}

export default RegisterOTP