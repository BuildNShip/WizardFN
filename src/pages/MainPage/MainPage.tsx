import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './MainPage.module.css'

const MainPage = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
        </div>
    )
}

export default MainPage