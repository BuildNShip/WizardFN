import styles from "./Buttons.module.css"

const SecondaryButton = ({ ButtonText, onClick }: { ButtonText: string, onClick: () => void }) => {
    return (
        <>
            <button onClick={onClick} className={styles.secondaryButton}>
                {ButtonText}
            </button>
        </>
    )
}

export default SecondaryButton