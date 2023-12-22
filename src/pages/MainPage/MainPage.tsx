import Collections from '../../components/Collections/Collections'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './MainPage.module.css'

import { LuUploadCloud } from "react-icons/lu";
import { PiFloppyDiskBack } from "react-icons/pi";
import PlusButton from './components/PlusButton/PlusButton';

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
                    <button className={styles.urlEditButton}><PiFloppyDiskBack className={styles.saveButton} size={20} />Edit</button>
                </div>

                <div className={styles.responsesViewContainer}>
                    <div className={styles.responsesTypes}>
                        <div className={`${styles.responseType} ${styles.active}`}>Type 1</div>
                        <div className={styles.responseType}>Analytics</div>
                    </div>
                    <div className={styles.responseView}>
                        <div className={styles.responseViewInnerContainer}>
                            <div className={styles.responseWithPlus}>
                                <div className={styles.response}>
                                    <div className={styles.responseTopBar}>
                                        <div className={styles.responseTopBarButtons}>
                                            <div>
                                                <img src="/assets/close.png" alt="" className={styles.responseTopBarButton} />
                                                <img src="/assets/maxmize.png" alt="" className={styles.responseTopBarButton} />
                                            </div>
                                            <div>
                                                <div className={styles.responseActive}>
                                                    <div className={styles.responseActiveDot}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.responseTopBarBButtons}>
                                            <div className={styles.row}>
                                                <select className={styles.selectButton} name="" id="">
                                                    <option value="">Type 1</option>
                                                    <option value="">Type 2</option>
                                                    <option value="">Type 3</option>
                                                </select>
                                                <div className={styles.responseTopBarButton}>View Desc</div>
                                            </div>
                                            <button className={styles.responseDeleteButton}>Delete</button>
                                        </div>
                                    </div>

                                    <textarea className={styles.responseTextArea} placeholder="Response" />
                                </div>
                                <PlusButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage