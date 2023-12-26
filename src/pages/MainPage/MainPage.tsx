import { useEffect, useState } from 'react';
import Collections from '../../components/Collections/Collections';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainPage.module.css';
import ResponseView from './components/ResponseView/ResponseView';
import TopBar from './components/TopBar/TopBar';
import URLContainer from './components/URLContainer/URLContainer';
import { guestRegister } from '../../apis/authentication'; // Import useJWT hook
import { UserContext } from './context';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      guestRegister();
    }

    if (localStorage.getItem('profileInfo') !== null) {
      setIsLoggedIn(true);
      setEmail(JSON.parse(localStorage.getItem('profileInfo') as string).email);
    }
  }, [isLoggedIn]);

  const [email, setEmail] = useState('');

  return (
    <>
      <UserContext.Provider
        value={{
          isLoggedIn,
          email,
          setIsLoggedIn,
          setEmail,
        }}
      >
        <div className={styles.mainContainer}>
          <Sidebar />
          <Collections />

          <div className={styles.mainAppContainer}>
            <TopBar />
            <URLContainer />
            <ResponseView />
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default MainPage;
