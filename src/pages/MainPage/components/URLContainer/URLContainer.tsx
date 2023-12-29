import { useState, useContext, useEffect } from 'react';
import styles from './URLContainer.module.css';
import { PiFloppyDiskBack } from 'react-icons/pi';

import { APIContext, UserContext } from '../../context';
import APIDescription from './ModalContainer/APIDescription/APIDescription';

const URLContainer = () => {
  // const [requestType, setRequestType] = useState('');
  // const [requestDescription, setRequestDescription] = useState('');
  const [modalTriggers, setModalTriggers] = useState<URLContainerProps>({
    isAPIDescriptionModalOpen: false,
  });

  const { currentProject } = useContext(UserContext);
  const { endpoints, setEndpoints } = useContext(APIContext);

  useEffect(() => {
    setEndpoints({
      ...endpoints,
      endPointData: {
        ...endpoints.endPointData,
        url: `https://wizard.api/${currentProject.code}`,
      },
    });
  }, [currentProject]);
  return (
    <>
      <APIDescription
        modalTriggers={modalTriggers}
        setModalTriggers={setModalTriggers}
        requestDescription={endpoints}
        setRequestDescription={setEndpoints}
      />
      <div className={styles.urlContainer}>
        <select
          className={styles.urlLabel}
          value={endpoints.endPointData.method}
          onChange={(e) => {
            setEndpoints({
              ...endpoints,
              endPointData: {
                ...endpoints.endPointData,
                method: e.target.value,
              },
            });
          }}
        >
          <option className={styles.menuItem} value="GET">
            GET
          </option>
          <option className={styles.menuItem} value="PUT">
            PUT
          </option>
          <option className={styles.menuItem} value="POST">
            POST
          </option>
          <option className={styles.menuItem} value="DELETE">
            DELETE
          </option>
          <option className={styles.menuItem} value="PATCH">
            PATCH
          </option>
        </select>
        <input
          className={styles.urlInput}
          placeholder="https://www.example.com"
          value={endpoints.endPointData.url}
          onChange={(e) => {
            setEndpoints({
              ...endpoints,
              endPointData: {
                ...endpoints.endPointData,
                url: e.target.value,
              },
            });
          }}
        />
        <button className={styles.urlSendButton}>Send</button>
        <button
          onClick={() => {
            setModalTriggers({
              ...modalTriggers,
              isAPIDescriptionModalOpen: true,
            });
          }}
          className={styles.urlEditButton}
        >
          <PiFloppyDiskBack className={styles.saveButton} size={20} />
          API Description
        </button>
      </div>
    </>
  );
};

export default URLContainer;
