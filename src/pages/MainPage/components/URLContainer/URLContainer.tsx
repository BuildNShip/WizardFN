import { useState, useContext } from 'react';
import styles from './URLContainer.module.css';
import { PiFloppyDiskBack } from 'react-icons/pi';

import { APIContext, UserContext } from '../../context';
import APIDescription from './ModalContainer/APIDescription/APIDescription';
import toast from 'react-hot-toast';
import { saveEndpoint } from '../../../../apis/endpoints';

const URLContainer = () => {
  const [modalTriggers, setModalTriggers] = useState<URLContainerProps>({
    isAPIDescriptionModalOpen: false,
  });

  const { currentProject } = useContext(UserContext);
  const { currentEndpoints: endpoints, setCurrentEndpoints: setEndpoints } =
    useContext(APIContext);

  const handleSendRequest = () => {
    const lastApiResponse =
      endpoints.apiResponses[endpoints.apiResponses.length - 1];
    try {
      const json = JSON.parse(lastApiResponse.body as string);

      if (json === '{}') {
        toast.error('Kindly enter a valid JSON  in the response body');
        return;
      }

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

      saveEndpoint({ ...endpoints, apiResponses: updatedApiResponses });

      toast.success('Request sent successfully');
    } catch (error) {
      toast.error('Invalid JSON in the response body');
    }
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
        <div className={styles.urlInput}>
          {`https://wizard.api/${currentProject.code}`}
          <input
          autoFocus={true}
            value={endpoints.endPointData.url}
            className={styles.urlInputField}
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
        </div>
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
