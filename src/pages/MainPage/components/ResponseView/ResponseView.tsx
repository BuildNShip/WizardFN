import styles from "./ResponseView.module.css"
import PlusButton from "../PlusButton/PlusButton"

const ResponseView = () => {
    return (
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
    )
}

export default ResponseView