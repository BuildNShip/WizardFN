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
                            <div className={styles.modalTitle}>
                                Login
                            </div>
                            <div className={styles.modalSubtitle}>
                                Welcome back! Login to your workspace
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Password
                                </div>
                                <input onChange={(e) => setPassword(e.target.value)} className={styles.modalInput} type="password" />
                            </div>
                            <div className={styles.modalButtonContainer}>
                                <button onClick={() => login(email, password)} className={styles.modalButton}>
                                    Login
                                </button>
                            </div>
                            <p onClick={() => {
                                setModalTriggers({
                                    ...modalTriggers,
                                    isLoginModalOpen: false,
                                    isRegisterModalOpen: true
                                })
                            }} className={styles.subText}>Don't have an account? Register</p>

                            <p onClick={() => {
                                setModalTriggers({
                                    ...modalTriggers,
                                    isLoginModalOpen: false,
                                    isForgetPasswordModalOpen: true
                                })
                            }} className={styles.forgetPassword}>
                                Forget Password? Click Here to Reset.
                            </p>

                            <p onClick={() => {
                                setModalTriggers({
                                    isRegisterModalOpen: true,
                                    isLoginModalOpen: false,
                                    isForgetPasswordModalOpen: false,
                                    isLoginWithOTPModalOpen: true
                                })
                            }} className={styles.forgetPassword}>
                                Login with OTP
                            </p>
                        </div>
                    </Modal >
                )
            }</>
    )
}

export default LoginPassword