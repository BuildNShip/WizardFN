import { useState } from "react";
import { forgetPassword, resetPassword } from "../../../../../../apis/authentication";
import Modal from "../../../Modal/Modal";
import styles from "./ForgetPassword.module.css"
import { ModalTriggersType } from "../../types";
import toast from "react-hot-toast";

const ForgetPassword = ({ modalTriggers, setModalTriggers, Modalname, resetKey }: {
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string, resetKey?: string | null
}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [otpSent, setOtpSent] = useState(resetKey ? true : false);
    const [id] = useState(resetKey);
    const [password, setPassword] = useState('');

    return (
        <>
            {
                modalTriggers[Modalname as keyof ModalTriggersType] && (
                    <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
                        <div className={styles.modalContent}>
                            {/* <div className={styles.modalTitle}>
                                Forget Password
                            </div>
                            <div className={styles.modalSubtitle}>
                                Enter your email to reset your password
                            </div> */}
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input onChange={(e) => {
                                    setEmail(e.target.value);
                                }} className={styles.modalInput} type="text" />
                            </div>

                            {otpSent && <>
                                <div className={styles.modalInputContainer}>
                                    <div className={styles.modalInputLabel}>
                                        Name
                                    </div>
                                    <input onChange={(e) => {
                                        setName(e.target.value);
                                    }} className={styles.modalInput} type="text" />
                                </div>
                                <div className={styles.modalInputContainer}>
                                    <div className={styles.modalInputLabel}>
                                        Profile Picture
                                    </div>
                                    <input onChange={(e) => {
                                        setProfilePic(e.target.value);
                                    }} className={styles.modalInput} type="text" />
                                </div>
                                <div className={styles.modalInputContainer}>
                                    <div className={styles.modalInputLabel}>
                                        Enter Password<span>*</span>
                                    </div>
                                    <input onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} className={styles.modalInput} type="password" />
                                </div>
                            </>}
                            <div className={styles.modalButtonContainer}>
                                <button onClick={() => {
                                    if (!otpSent) {
                                        forgetPassword(email, setOtpSent);
                                        setModalTriggers({
                                            ...modalTriggers,
                                            isForgetPasswordModalOpen: false,
                                            isLoginModalOpen: false
                                        })
                                    }
                                    else
                                        if (id)
                                            resetPassword(email, name, profilePic, id, password, setModalTriggers, setOtpSent);
                                        else
                                            toast.error("Password Reset Faild")
                                }} className={styles.modalButton}>
                                    {otpSent ? 'Reset Password' : 'Send Reset Link'}
                                </button>
                            </div>
                            <p onClick={() => {
                                setModalTriggers({
                                    ...modalTriggers,
                                    isForgetPasswordModalOpen: false,
                                    isLoginModalOpen: true
                                })
                            }} className={styles.subText}>Remembered your password? Login</p>
                        </div>
                    </Modal >
                )
            }</>
    )
}

export default ForgetPassword