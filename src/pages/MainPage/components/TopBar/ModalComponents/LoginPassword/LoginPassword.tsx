//React Imports
import { useState } from "react";

//Component Imports
import Modal from "../../../Modal/Modal";

//Styles Import
import styles from "./LoginPassword.module.css"

//API Calling Functions
import { login } from "../../../../../../apis/authentication";
import { ModalTriggersType } from "../../types";

const LoginPassword = ({ modalTriggers, setModalTriggers, Modalname }: {
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {
                modalTriggers[Modalname as keyof ModalTriggersType] && (
                    <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
                        <div className={styles.modalContent}>
                            {/* <div className={styles.modalTitle}>
                                Login
                            </div> */}
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Password<span>*</span>
                                </div>
                                <input placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className={styles.modalInput} type="password" />
                            </div>
                            <div className={styles.modalButtonContainer}>
                                <button onClick={() => login(email, password)} className={styles.modalButton}>
                                    Login
                                </button>

                                <button onClick={() => {
                                    setModalTriggers({
                                        isRegisterModalOpen: true,
                                        isLoginModalOpen: false,
                                        isForgetPasswordModalOpen: false,
                                        isLoginWithOTPModalOpen: true
                                    })
                                }} className={styles.secondaryButton}>
                                    Login with OTP
                                </button>
                            </div>
                            <div className={styles.modalFooter}>
                                <p onClick={() => {
                                    setModalTriggers({
                                        ...modalTriggers,
                                        isLoginModalOpen: false,
                                        isRegisterModalOpen: true
                                    })
                                }} className={styles.subText}>Don't have an account? <span> Register</span></p>

                                <p onClick={() => {
                                    setModalTriggers({
                                        ...modalTriggers,
                                        isLoginModalOpen: false,
                                        isForgetPasswordModalOpen: true
                                    })
                                }} className={styles.subText}>
                                    <span>Reset Password</span>
                                </p>
                            </div>

                        </div>
                    </Modal >
                )
            }</>
    )
}

export default LoginPassword