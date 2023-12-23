import { useState } from 'react';
import styles from './TopBar.module.css'
import { LuUploadCloud } from 'react-icons/lu'
import RegisterOTP from './RegisterOTP/RegisterOTP';

const TopBar = () => {
    const [isModalOpen, setModalOpen] = useState(true);

    return (
        <>
            <RegisterOTP isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
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
                        setModalOpen(true)
                    }}>Login</button>
                </div>
            </div>
        </>
    )
}

export default TopBar