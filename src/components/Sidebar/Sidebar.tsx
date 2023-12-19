import styles from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className={styles.projectsSideBarContainer}>
            <div className={styles.projectsSideBar}>
                <p className={styles.projectsSideBarHeading}>Projects</p>
                <div className={styles.projects}>
                    <div className={styles.project}>AB</div>
                    <div className={styles.project}>CD</div>
                    <div className={styles.project}>EF</div>
                    <div className={styles.project}>GH</div>
                </div>
                <div className={styles.addProjects}>
                    <p className={styles.addProjectsPlus}>+</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar