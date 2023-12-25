import { useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./ModalContentStyles.module.css"
import { generateOTP, login, preRegister, register } from "../../../../../apis/authentication";
import { ModalTriggersType } from "../types";
import PrimaryButton from "../../Buttons/PrimaryButton";


const RegisterOTP = ({ email, setEmail, modalTriggers, setModalTriggers, Modalname, modalType }: {
    email: string, setEmail: (email: string) => void,
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string, modalType: string
}) => {

    const [showOTP, setShowOTP] = useState(false);
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
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div>
                            {showOTP && <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Enter OTP
                                </div>
                                <input placeholder="Enter the OTP you received" onChange={(e) => {
                                    setOTP(e.target.value);
                                }} className={styles.modalInput} type="number" />
                            </div>}
                            <div className={styles.modalButtonContainer}>
                                <PrimaryButton onClick={() => {
                                    if (!showOTP)
                                        if (modalType === 'loginWithOTP')
                                            generateOTP(email, setShowOTP, setModalTriggers, "Login");
                                        else
                                            preRegister(email, setShowOTP, setModalTriggers);
                                    else
                                        if (modalType === 'loginWithOTP') {
                                            login(email, otp, setModalTriggers, 'loginWithOTP')
                                            setShowOTP(false);
                                        }
                                        else
                                            register(email, otp, setModalTriggers)
                                }}
                                    ButtonText={showOTP ? 'Verify OTP' : 'Send OTP'} />
                            </div>


                        </div>
                        <div className={styles.modalFooter}>
                            <hr className={styles.horizontalLine} />
                            <div className={styles.subTexts}>
                                {modalType != 'loginWithOTP' ? <p onClick={() => {
                                    setModalTriggers({
                                        ...modalTriggers,
                                        isRegisterModalOpen: false,
                                        isLoginModalOpen: true,
                                        isForgetPasswordModalOpen: false
                                    })
                                }} className={styles.subText}>Already have a Account? <span>Login</span></p> :
                                    <p onClick={() => {

                                        setModalTriggers({
                                            ...modalTriggers,
                                            isRegisterModalOpen: false,
                                            isLoginModalOpen: true,
                                            isForgetPasswordModalOpen: false
                                        })


                                    }} className={styles.subText}>
                                        Login with <span>Password</span>
                                    </p>}
                            </div>
                        </div>
                    </Modal>
                )
            }</>
    )
}

export default RegisterOTP