import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from 'react';
import styles from './ResponseContainer.module.css';
import { Editor } from 'json5-editor';
import { APIContext } from '../../../../context';

const ResponseContainer = ({
  responseData,
  setResponseData,
  responseCount,
}: {
  responseData: ApiResponse[];
  setResponseData: Dispatch<SetStateAction<ApiResponse[]>>;
  responseCount: number;
}) => {
  const [jsonData, setJsonData] = useState('{}');
  const { currentEndpoints: endpoints, setCurrentEndpoints: setEndpoints } =
    useContext(APIContext);

  const [showDescription, setShowDescription] = useState(false);

  const updateState = (fieldName: any, newValue: any) => {
    const updatedData = responseData.map((item) => {
      if (item.order === responseCount) {
        return { ...item, [fieldName]: newValue };
      }
      return item;
    });
    setResponseData(updatedData);
  };

  useEffect(() => {
    setEndpoints({
      ...endpoints,
      apiResponses: responseData,
    });
  }, [responseData]);

  useEffect(() => {
    updateState('body', jsonData);
  }, [jsonData]);

  return (
    <div className={styles.response}>
      <div className={styles.responseTopBar}>
        <div className={styles.responseTopBarButtons}>
          <div>
            <img
              src="/assets/close.png"
              alt=""
              className={styles.responseTopBarButton}
            />
            <img
              src="/assets/maxmize.png"
              alt=""
              className={styles.responseTopBarButton}
            />
          </div>
          <div>
            <div
              onClick={() => {
                updateState(
                  'isActive',
                  !responseData[responseCount - 1]?.isActive,
                );
              }}
              className={styles.responseActive}
            >
              <div
                className={
                  responseData[responseCount - 1]?.isActive
                    ? styles.responseActiveDot
                    : styles.responseInactiveDot
                }
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.responseTopBarBButtons}>
          <div className="row">
            <select
              onChange={(e) => {
                updateState('responseCode', Number(e.target.value));
              }}
              className={styles.selectButton}
              name=""
              id=""
            >
              <option value="200">200</option>
              <option value="400">400</option>
            </select>
            {!showDescription && (
              <div
                onClick={() => {
                  setShowDescription(true);
                }}
                className={styles.responseTopBarButton}
              >
                View Desc
              </div>
            )}
          </div>
          <button className={styles.responseDeleteButton}>Delete</button>
        </div>
        {showDescription && (
          <div className={styles.row1}>
            <input
              onChange={(e) => {
                updateState('description', e.target.value);
              }}
              type="text"
              value={responseData[responseCount - 1]?.description}
              className={styles.apiResponseDescription}
            />
            <button
              onClick={() => {
                setShowDescription(false);
              }}
              className={styles.saveButton}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className={styles.editorContainer}>
        <Editor
          showLineNumber
          style={{
            backgroundColor: '#1e1e1e',
            zIndex: 0,
          }}
          value={jsonData}
          onChange={setJsonData}
        />
      </div>
    </div>
  );
};

export default ResponseContainer;
