import { useState } from 'react';
import styles from './TopBar.module.css'
import { LuUploadCloud } from 'react-icons/lu'
import RegisterOTP from './ModalComponents/RegisterOTP/RegisterOTP';
import LoginPassword from './ModalComponents/LoginPassword/LoginPassword';
import ForgetPassword from './ModalComponents/ForgetPassword/ForgetPassword';

const TopBar = () => {
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(true);
    const [isForgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);

    return (
        <>
            <RegisterOTP isModalOpen={isRegisterModalOpen} setModalOpen={setRegisterModalOpen} setLoginModalOpen={setLoginModalOpen} />
            <LoginPassword isModalOpen={isLoginModalOpen} setModalOpen={setLoginModalOpen} setRegisterModalOpen={setRegisterModalOpen} setForgetPasswordModalOpen={setForgetPasswordModalOpen} />
            <ForgetPassword isModalOpen={isForgetPasswordModalOpen} setModalOpen={setForgetPasswordModalOpen} setLoginModalOpen={setLoginModalOpen} />
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
                        setRegisterModalOpen(true)
                    }}>Register</button>
                </div>
            </div>
        </>
    )
}

export default TopBar