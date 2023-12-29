import { useEffect, useState } from 'react';
import Collections from '../../components/Collections/Collections';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainPage.module.css';
import ResponseView from './components/ResponseView/ResponseView';
import URLContainer from './components/URLContainer/URLContainer';
import { guestRegister } from '../../apis/authentication'; // Import useJWT hook
import { UserContext, APIContext } from './context';
import TopBar from '../../components/TopBar/TopBar';
import { ProjectType } from '../../components/Sidebar/types';

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

  const [endpoints, setEndpoints] = useState<APIData>({
    endPointData: {
      id: '',
      title: ' Untitled Endpoint',
      collectionId: currentCollection.id,
      method: '',
      url: '',
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
    setEndpoints({
      ...endpoints,
      endPointData: {
        ...endpoints.endPointData,
        collectionId: currentCollection.id,
      },
    });
  }, [currentCollection]);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoggedIn,
          email,
          setIsLoggedIn,
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
              endpoints,
              setEndpoints,
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
