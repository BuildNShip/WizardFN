import { useState, useContext } from 'react';
import styles from './URLContainer.module.css';
import { PiFloppyDiskBack } from 'react-icons/pi';

import { UserContext } from '../../context';
import APIDescription from './ModalContainer/APIDescription/APIDescription';

const URLContainer = () => {
  const [requestType, setRequestType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [modalTriggers, setModalTriggers] = useState<URLContainerProps>({
    isAPIDescriptionModalOpen: false,
  });

  const { currentProject } = useContext(UserContext);

  const [url, setUrl] = useState(`https://wizard.api/${currentProject.code}`);
  return (
    <>
      <APIDescription
        modalTriggers={modalTriggers}
        setModalTriggers={setModalTriggers}
        requestDescription={requestDescription}
        setRequestDescription={setRequestDescription}
      />
      <div className={styles.urlContainer}>
        <select
          className={styles.urlLabel}
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
