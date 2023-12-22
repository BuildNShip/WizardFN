import styles from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className={styles.projectsSideBarContainer}>
            <div className={styles.projectsSideBar}>
                <p className={styles.projectsSideBarHeading}>Projects</p>
               
                <div className={styles.projectsContainer}>
                    <div className={styles.projects}>
                        <div className={styles.project}>AB</div>
                        <div style={{ backgroundColor: "#4592FF", color: "#FFFFFF" }} className={styles.project}>CD</div>
                        <div style={{ backgroundColor: "#997FFF", color: "#FFFFFF" }} className={styles.project}>EF</div>
                        <div style={{ backgroundColor: "#00D8FF" }} className={styles.project}>GH</div>
                        <div style={{ backgroundColor: "#4592FF", color: "#FFFFFF" }} className={styles.project}>CD</div>
                        <div style={{ backgroundColor: "#997FFF", color: "#FFFFFF" }} className={styles.project}>EF</div>
                        <div style={{ backgroundColor: "#00D8FF" }} className={styles.project}>GH</div>
                        <div style={{ backgroundColor: "#4592FF", color: "#FFFFFF" }} className={styles.project}>CD</div>
                        <div style={{ backgroundColor: "#997FFF", color: "#FFFFFF" }} className={styles.project}>EF</div>
                        <div style={{ backgroundColor: "#00D8FF" }} className={styles.project}>GH</div>
                        <div style={{ backgroundColor: "#4592FF", color: "#FFFFFF" }} className={styles.project}>CD</div>
                        <div style={{ backgroundColor: "#997FFF", color: "#FFFFFF" }} className={styles.project}>EF</div>
                        <div style={{ backgroundColor: "#00D8FF" }} className={styles.project}>GH</div>

                    </div>
                    <div className={styles.addProjects}>
                        <p className={styles.addProjectsPlus}>+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar