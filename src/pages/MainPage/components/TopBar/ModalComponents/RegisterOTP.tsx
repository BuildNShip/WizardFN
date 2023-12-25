import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./ModalContentStyles.module.css"
import { generateOTP, login, preRegister, register } from "../../../../../apis/authentication";
import { ModalTriggersType } from "../types";
import PrimaryButton from "../../Buttons/PrimaryButton";


const RegisterOTP = ({ email, modalTriggers, setModalTriggers, Modalname, modalType }: {
    email: string,
    modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string, modalType: string
}) => {

    const [otp, setOTP] = useState('');
    useEffect(() => {
        if (!otp || otp.length === 0) {
            if (modalTriggers[Modalname as keyof ModalTriggersType] || modalType === 'loginWithOTP') {
                if (modalType === 'loginWithOTP')
                    generateOTP(email, setModalTriggers, modalTriggers, "Login");
                if (modalType === 'registerWithOTP')
                    preRegister(email, setModalTriggers, modalTriggers);
            }
        }
        else {
            setOTP('');
        }
    }, [modalType])

    return (
        <>
            {
                modalTriggers[Modalname as keyof ModalTriggersType] && (
                    <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalTitle}>
                                {modalType === 'loginWithOTP' ? 'Login' : 'Register'} with OTP
                            </div>
                            {/* <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
                            </div> */}
                            <p className={styles.emailLabel}>{email}</p>
                            <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Enter OTP
                                </div>
                                <input placeholder="Enter the OTP you received" onChange={(e) => {
                                    setOTP(e.target.value);
                                }} className={styles.modalInput} type="number" />
                            </div>
                            <div className={styles.modalButtonContainer}>
                                <PrimaryButton onClick={() => {
                                    if (modalType === 'loginWithOTP')
                                        login(email, otp, setModalTriggers, modalTriggers, 'loginWithOTP')
                                    else
                                        register(email, otp, setModalTriggers, modalTriggers)
                                }}
                                    ButtonText="Verify OTP" />
                            </div>
                        </div>
                        {/* <div className={styles.modalFooter}>
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
                        </div> */}
                    </Modal>
                )
            }</>
    )
}

export default RegisterOTP