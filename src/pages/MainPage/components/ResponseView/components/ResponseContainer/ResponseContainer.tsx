
import styles from './ResponseContainer.module.css'

const ResponseContainer = () => {
    return (
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
    )
}

export default ResponseContainer