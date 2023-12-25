//React Imports
import { useState } from "react";

//Component Imports
import Modal from "../../Modal/Modal";

//Styles Import
import styles from "./ModalContentStyles.module.css"

//API Calling Functions
import { login } from "../../../../../apis/authentication";
import { ModalTriggersType } from "../types";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton";


const LoginPassword = ({ email, setEmail, modalTriggers, setModalTriggers, Modalname }: {
    email: string, setEmail: (email: string) => void,
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string
}) => {

    const [password, setPassword] = useState('');

    return (
        <>
            {
                <>
                    {modalTriggers[Modalname as keyof ModalTriggersType] && (
                    <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                Login
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Password<span>*</span>
                                </div>
                                <input placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className={styles.modalInput} type="password" />
                            </div>
                            <div className={styles.modalButtonContainer}>
                                <PrimaryButton ButtonText="Login" onClick={() => login(email, password, setModalTriggers, modalTriggers, 'loginWithPassword')} />

                                <SecondaryButton onClick={() => {
                                    setModalTriggers({
                                        isRegisterModalOpen: true,
                                        isLoginModalOpen: false,
                                        isForgetPasswordModalOpen: false,
                                        isLoginWithOTPModalOpen: true,
                                        isEmailValidated: false,
                                        showBinaryPopup: false,
                                    })
                                }} ButtonText="Login with OTP" />
                            </div>


                        </div>
                        <div className={styles.modalFooter}>
                            <hr className={styles.horizontalLine} />
                            <div className={styles.subTexts}>
                                {/* <p onClick={() => {
                                    setModalTriggers({
                                        ...modalTriggers,
                                        isLoginModalOpen: false,
                                        isRegisterModalOpen: true
                                    })
                                }} className={styles.subText}>Don't have an account? <span> Register</span></p> */}

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
                    )}

                    {/* {showBinaryPopup && <BinaryPopup />} */}
                </>
            }</>
    )
}

export default LoginPassword