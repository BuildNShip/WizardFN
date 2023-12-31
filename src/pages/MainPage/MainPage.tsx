import { useEffect, useState } from 'react';
import { guestRegister } from '../../apis/authentication'; 

import { UserContext, APIContext } from './context';
import { ProjectType } from '../../components/Sidebar/types';

import Collections from '../../components/Collections/Collections';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainPage.module.css';
import ResponseView from './components/ResponseView/ResponseView';
import URLContainer from './components/URLContainer/URLContainer';
import TopBar from '../../components/TopBar/TopBar';



const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  //State for storing the currenly selected project and collection
  const [currentProject, setCurrentProject] = useState<ProjectType>({
    id: '',
    updated_by: '',
    title: '',
    token: '',
    updated_at: '',
    code: '',
    selected: true,
  });
  const [currentCollection, setCurrentCollection] = useState<Collection>({
    id: '',
    updated_by: '',
    title: '',
    order: 0,
    created_at: '',
    created_by: '',
    updated_at: '',
    project_id: '',
    endpoints: [] as any[], // You can replace 'any' with a more specific type if needed
  });
  //State for storing the currently selected endpoint
  const [currentEndpoints, setCurrentEndpoints] = useState<APIData>({
    endPointData: {
      id: '',
      title: ' Untitled Endpoint',
      collectionId: currentCollection.id,
      method: 'GET',
      url: '/',
      description: '',
      isActive: true,
      cors: [],
      token: '',
    },
    apiResponses: [
      {
        responseCode: 200,
        body: '',
        isActive: true,
        description: '',
        order: 0,
      },
      {
        responseCode: 500,
        body: '',
        isActive: true,
        description: '',
        order: 0,
      },
    ],
  });

  useEffect(() => {
    setCurrentEndpoints({
      ...currentEndpoints,
      endPointData: {
        ...currentEndpoints.endPointData,
        collectionId: currentCollection.id,
      },
    });
  }, [currentCollection]);

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      guestRegister();
      setIsLoggedIn(false);
    }

    if (localStorage.getItem('profileInfo') !== null) {
      setIsLoggedIn(true);
      setEmail(JSON.parse(localStorage.getItem('profileInfo') as string).email);
    }
  }, [isLoggedIn]);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,

          email,
          setEmail,

          currentProject,
          setCurrentProject,

          currentCollection,
          setCurrentCollection,
        }}
      >
        <div className={styles.mainContainer}>
          <Sidebar />
          <Collections />

          <APIContext.Provider
            value={{
              currentEndpoints,
              setCurrentEndpoints,
            }}
          >
            <div className={styles.mainAppContainer}>
              <TopBar />
              <URLContainer />
              <ResponseView />
            </div>
          </APIContext.Provider>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default MainPage;
