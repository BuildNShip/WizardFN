import styles from './PlusButton.module.css'

const PlusButton = ({ setResponseCount, responseCount }: { setResponseCount: (count: number) => void, responseCount: number }) => {
    return (
        <>
            <div onClick={() => {
                setResponseCount(responseCount + 1)
            }} className={styles.plusButtonContainer}>

                <div className={styles.line}></div>
                <div className={styles.plusButton}>+</div>
            </div>
        </>
    )
}

export default PlusButton