import { useEffect, useState } from 'react';
import styles from './TopBar.module.css'
import { LuUploadCloud } from 'react-icons/lu'
import RegisterOTP from './ModalComponents/RegisterOTP';
import LoginPassword from './ModalComponents/LoginPassword';
import ForgetPassword from './ModalComponents/ForgetPassword';
import { ModalTriggersType } from './types';

import ValidateEmail from './ModalComponents/ValidateEmail';
import BinaryPopup from './ModalComponents/BinaryPopup/BinaryPopup';
import { mergeAccount } from '../../../../apis/authentication';

const TopBar = () => {
    const [modalTriggers, setModalTriggers] = useState<ModalTriggersType>({
        isRegisterModalOpen: false,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isEmailValidated: false,
        showBinaryPopup: false,

        askMergePopup: false,
    });

    const [modalType, setModalType] = useState('' as string);

    const [email, setEmail] = useState('aswinasokofficial@gmail.com');

    useEffect(() => {
        if (modalTriggers.isLoginWithOTPModalOpen)
            setModalType('loginWithOTP')
        if (modalTriggers.isForgetPasswordModalOpen)
            setModalType('forgetPassword')
        if (modalTriggers.isRegisterModalOpen && !modalTriggers.isLoginWithOTPModalOpen)
            setModalType('registerWithOTP')
    }, [modalTriggers])

    return (
        <>
            {
                modalTriggers.askMergePopup && (
                    <BinaryPopup onClick={() => {
                        mergeAccount(email, true, setModalTriggers, modalTriggers)
                    }}
                        onClickCancel={() => {
                            mergeAccount(email, false, setModalTriggers, modalTriggers)
                        }}
                        content={"There could be data associated with this temporary account. Do you want to merge it with your new account?"}
                        buttonText={"Merge Accounts"}
                        modalTriggers={modalTriggers}
                        setModalTriggers={setModalTriggers}
                        Modalname={"askMergePopup"}
                    />
                )
            }


            <ValidateEmail email={email} setEmail={setEmail} modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname="isEmailValidated" />

            <RegisterOTP email={email} modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname="isRegisterModalOpen" modalType={modalType} />

            <LoginPassword modalTriggers={modalTriggers} email={email} setModalTriggers={setModalTriggers} Modalname="isLoginModalOpen" />

            <ForgetPassword modalTriggers={modalTriggers} email={email} setModalTriggers={setModalTriggers} Modalname="isForgetPasswordModalOpen" modalType={modalType} />

            <div className={styles.mainAppTopbar}>

                <div className={styles.topbarTabsContainer}>
                    <div className={styles.topbarTabs}>
                        <div className={styles.topbarTabActive}>
                            <span className={styles.tabType}>
                                Drafts
                            </span>
                            Untitled
                        </div>
                        <div className={styles.topbarTab}>
                            Another Tab
                        </div>
                    </div>
                    <div className={styles.topbarAddTab}>
                        +
                    </div>
                    <div className={styles.shareButton}>
                        Share
                    </div>
                </div>

                <div className={styles.topbarActions}>
                    <button className={styles.saveToWorkspace}><LuUploadCloud className={styles.saveButton} /> Save My Workspace</button>
                    <button className={styles.logoutButton} onClick={() => {
                        setModalTriggers({
                            ...modalTriggers,
                            isEmailValidated: true
                        })
                    }}>Login</button>
                </div>
            </div>
        </>
    )
}

export default TopBar