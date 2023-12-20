import styles from "./Collections.module.css"

const Collections = () => {
    return (
        <div className={styles.collectionsContainer}>
            <div className={styles.collectionsTopbar}>
                <div className={styles.collectionsTopbarUsername}>
                    <div className={styles.collectionTopbarAvatar}>S</div>
                    <div className={styles.collectionTopbarName}>Salman Faariz</div>
                </div>
            </div>
            <div className={styles.collectionsMenuContainer}>
                <div className={styles.searchBar}>
                    <input className={styles.searchMenu} type="text" placeholder="Search files, teams or people" />
                </div>
                <div className={styles.collectionsMenu}>

                </div>
            </div>
        </div>
    )
}

export default Collections