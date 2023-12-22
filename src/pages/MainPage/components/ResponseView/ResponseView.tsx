import styles from "./ResponseView.module.css"
import PlusButton from "../PlusButton/PlusButton"
import ResponseContainer from "./components/ResponseContainer/ResponseContainer"
import { useState } from "react";

const ResponseView = () => {
    const [responseCount, setResponseCount] = useState(1);
    return (
        <div className={styles.responsesViewContainer}>
            <div className={styles.responsesTypes}>
                <div className={`${styles.responseType} ${styles.active}`}>Responses</div>
                <div className={styles.responseType}>Analytics</div>
            </div>

            <div className={styles.responseView}>
                <div className={styles.responseViewInnerContainer}>
                    <div className={styles.responseWithPlus}>
                        {Array.from({ length: responseCount }).map((_, index) => (
                            <ResponseContainer key={index} />
                        ))}
                        <PlusButton setResponseCount={setResponseCount} responseCount={responseCount} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponseView