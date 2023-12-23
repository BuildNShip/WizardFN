//React Imports
import { useState } from "react";

//Component Imports
import Modal from "../../../Modal/Modal";

//Styles Import
import styles from "./LoginPassword.module.css"

//API Calling Functions
import { login } from "../../../../../../apis/authentication";

const LoginPassword = ({ isModalOpen, setModalOpen, setRegisterModalOpen, setForgetPasswordModalOpen }: {
    isModalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setForgetPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {
                isModalOpen && (
                    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} >
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
                                setRegisterModalOpen(true);
                                setModalOpen(false);
                            }} className={styles.subText}>Don't have an account? Register</p>

                            <p onClick={() => {
                                setModalOpen(false);
                                setForgetPasswordModalOpen(true);

                            }} className={styles.forgetPassword}>
                                Forget Password? Click Here to Reset.
                            </p>
                        </div>
                    </Modal >
                )
            }</>
    )
}

export default LoginPassword