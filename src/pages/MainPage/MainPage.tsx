import Collections from '../../components/Collections/Collections'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './MainPage.module.css'

const MainPage = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />

            <Collections />
        </div>
    )
}

export default MainPage