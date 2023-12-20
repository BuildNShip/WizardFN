import Collections from '../../components/Collections/Collections'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './MainPage.module.css'

import { LuUploadCloud } from "react-icons/lu";
import { PiFloppyDiskBack } from "react-icons/pi";

const MainPage = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />

            <Collections />

            <div className={styles.mainAppContainer}>
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
                        <button className={styles.logoutButton}>Logout</button>
                    </div>
                </div>


                <div className={styles.urlContainer}>
                    <p className={styles.urlLabel}>URL</p>
                    <input className={styles.urlInput} placeholder="https://www.example.com" />
                    <button className={styles.urlSendButton}>Send</button>
                    <button className={styles.urlEditButton}><PiFloppyDiskBack className={styles.saveButton} size={20}/>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage