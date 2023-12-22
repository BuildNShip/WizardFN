import styles from './PlusButton.module.css'

const PlusButton = () => {
    return (
        <>
            <div className={styles.plusButtonContainer}>

                <div className={styles.line}></div>
                <div className={styles.plusButton}>+</div>
            </div>
        </>
    )
}

export default PlusButton