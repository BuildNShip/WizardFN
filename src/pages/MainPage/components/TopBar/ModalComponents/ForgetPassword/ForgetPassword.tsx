import { useState } from "react";
import { forgetPassword, generateOTP, resetPassword } from "../../../../../../apis/authentication";
import Modal from "../../../Modal/Modal";
import styles from "./ForgetPassword.module.css"

const ForgetPassword = (
    {
        isModalOpen,
        setModalOpen,
        setLoginModalOpen
    }: {
        isModalOpen: boolean,
        setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {
                isModalOpen && (
                    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} >
                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                Forget Password
                            </div>
                            <div className={styles.modalSubtitle}>
                                Enter your email to reset your password
                            </div>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email
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
                                        ID
                                    </div>
                                    <input onChange={(e) => {
                                        setId(e.target.value);
                                    }} className={styles.modalInput} type="text" />
                                </div>
                                <div className={styles.modalInputContainer}>
                                    <div className={styles.modalInputLabel}>
                                        Enter Password
                                    </div>
                                    <input onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} className={styles.modalInput} type="password" />
                                </div>
                            </>}
                            <div className={styles.modalButtonContainer}>
                                <button onClick={() => {
                                    if (!otpSent)
                                        forgetPassword(email, setOtpSent);
                                    else
                                        resetPassword(email, name, profilePic, id, password);
                                }} className={styles.modalButton}>
                                    {otpSent ? 'Reset Password' : 'Send Reset Link'}
                                </button>
                            </div>
                            <p onClick={() => {
                                setLoginModalOpen(true);
                                setModalOpen(false);
                            }} className={styles.subText}>Remembered your password? Login</p>
                        </div>
                    </Modal >
                )
            }</>
    )
}

export default ForgetPassword