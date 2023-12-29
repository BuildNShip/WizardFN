import { useState, useContext, useEffect } from 'react';
import styles from './URLContainer.module.css';
import { PiFloppyDiskBack } from 'react-icons/pi';

import { APIContext, UserContext } from '../../context';
import APIDescription from './ModalContainer/APIDescription/APIDescription';
import toast from 'react-hot-toast';

const URLContainer = () => {
  // const [requestType, setRequestType] = useState('');
  // const [requestDescription, setRequestDescription] = useState('');
  const [modalTriggers, setModalTriggers] = useState<URLContainerProps>({
    isAPIDescriptionModalOpen: false,
  });

  const { currentProject } = useContext(UserContext);
  const { endpoints, setEndpoints } = useContext(APIContext);

  const [toBackend, setToBackend] = useState<APIData>({
    endPointData: {
      id: '',
      title: 'Untitled Endpoint',
      collectionId: '',
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
    ],
  });

  useEffect(() => {
    setEndpoints({
      ...endpoints,
      endPointData: {
        ...endpoints.endPointData,
        url: `https://wizard.api/${currentProject.code}`,
      },
    });
  }, [currentProject]);

  useEffect(() => {
    console.log(toBackend);
  }, [toBackend]);

  const handleSendRequest = () => {
    const lastApiResponse =
      endpoints.apiResponses[endpoints.apiResponses.length - 1];
    try {
      const json = JSON.parse(lastApiResponse.body as string);

      if (json === '{}') {
        toast.error('Kindly enter a valid JSON  in the response body');
        return;
      }
      updateBody();
      toast.success('Request sent successfully');
    } catch (error) {
      toast.error('Invalid JSON in the response body');
    }
  };

  const updateBody = () => {
    const updatedApiResponses = endpoints.apiResponses.map(
      (apiResponse: ApiResponse) => {
        try {
          return {
            ...apiResponse,
            body: JSON.parse(apiResponse.body as string),
          };
        } catch (error) {
          return apiResponse;
        }
      },
    );
    setToBackend({ ...endpoints, apiResponses: updatedApiResponses });

    setEndpoints({ ...endpoints, apiResponses: updatedApiResponses });
  };

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
        <button
          onClick={() => {
            handleSendRequest();
          }}
          className={styles.urlSendButton}
        >
          Send
        </button>
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
