import styles from "./ResponseView.module.css"
import PlusButton from "../PlusButton/PlusButton"
import ResponseContainer from "./components/ResponseContainer/ResponseContainer"

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
                        <ResponseContainer />
                        <PlusButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponseView