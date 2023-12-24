import { useState } from "react";
import Modal from "../../../Modal/Modal";
import styles from "./RegisterOTP.module.css"
import { generateOTP, login, preRegister, register } from "../../../../../../apis/authentication";
import { ModalTriggersType } from "../../types";


const RegisterOTP = ({ modalTriggers, setModalTriggers, Modalname, modalType }: {
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string, modalType: string
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
                                {modalType === 'loginWithOTP' ? 'Login' : 'Register'} with OTP
                            </div>
                            <div className={styles.modalSubtitle}>
                                Enter in your email to generate OTP
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
                                        if (modalType === 'loginWithOTP')
                                            generateOTP(email, setShowOTP, setModalTriggers);
                                        else
                                            preRegister(email, setShowOTP, setModalTriggers);
                                    else
                                        if (modalType === 'loginWithOTP')
                                            login(email, otp, 'loginWithOTP')
                                        else
                                            register(email, otp)
                                }} className={styles.modalButton}>
                                    {showOTP ? 'Verify OTP' : 'Send OTP'}
                                </button>
                            </div>
                            {modalType != 'loginWithOTP' ? <p onClick={() => {
                                setModalTriggers({
                                    ...modalTriggers,
                                    isRegisterModalOpen: false,
                                    isLoginModalOpen: true,
                                    isForgetPasswordModalOpen: false
                                })
                            }} className={styles.subText}>Already have a Account? Login</p> :
                                <p onClick={() => {

                                    setModalTriggers({
                                        ...modalTriggers,
                                        isRegisterModalOpen: false,
                                        isLoginModalOpen: true,
                                        isForgetPasswordModalOpen: false
                                    })


                                }} className={styles.forgetPassword}>
                                    Login with Password
                                </p>}
                        </div>
                    </Modal>
                )
            }</>
    )
}

export default RegisterOTP