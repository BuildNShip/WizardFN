import { useEffect, useState } from 'react';
import styles from './TopBar.module.css'
import { LuUploadCloud } from 'react-icons/lu'
import RegisterOTP from './ModalComponents/RegisterOTP/RegisterOTP';
import LoginPassword from './ModalComponents/LoginPassword/LoginPassword';
import ForgetPassword from './ModalComponents/ForgetPassword/ForgetPassword';
import { ModalTriggersType } from './types';

import { useSearchParams } from "react-router-dom";

const TopBar = () => {
    const [modalTriggers, setModalTriggers] = useState<ModalTriggersType>({
        isRegisterModalOpen: false,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false
    });

    const [searchParams] = useSearchParams();
    const [resetKey] = useState(searchParams.get('resetPassword'));

    useEffect(() => {
        if (searchParams.get('resetPassword')) {
            setModalTriggers({
                ...modalTriggers,
                isForgetPasswordModalOpen: true
            })
            console.log("Dammmn")
        }

        console.log(searchParams.get('resetPassword'))
        console.log(resetKey)
    }, [])


    return (
        <>
            <RegisterOTP modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname="isRegisterModalOpen" />
            <LoginPassword modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname="isLoginModalOpen" />
            <ForgetPassword modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname="isForgetPasswordModalOpen" resetKey={resetKey} />
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
                            isRegisterModalOpen: true,
                            isLoginModalOpen: false,
                            isForgetPasswordModalOpen: false
                        })
                    }}>Register</button>
                </div>
            </div>
        </>
    )
}

export default TopBar