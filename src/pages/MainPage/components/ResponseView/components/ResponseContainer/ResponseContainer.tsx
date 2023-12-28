import { useEffect, useState } from 'react';
import styles from './ResponseContainer.module.css';
import { Editor } from 'json5-editor';

const ResponseContainer = () => {
  const [responseData, setResponseData] = useState<ResponseData>({
    responseCode: '',
    body: `{

    }`,
    isActive: false,
    description: '',
    order: 0,
  });

  const [jsonData, setJsonData] = useState(`{}`);

  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    setResponseData({
      ...responseData,
      body: jsonData,
    });
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
                setResponseData({
                  ...responseData,
                  isActive: !responseData.isActive,
                });
              }}
              className={styles.responseActive}
            >
              <div
                className={
                  responseData.isActive
                    ? styles.responseActiveDot
                    : styles.responseInactiveDot
                }
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.responseTopBarBButtons}>
          <div className={styles.row}>
            <select
              onChange={(e) => {
                setResponseData({
                  ...responseData,
                  responseCode: e.target.value,
                });
              }}
              className={styles.selectButton}
              name=""
              id=""
            >
              <option value="">200</option>
              <option value="">400</option>
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
                setResponseData({
                  ...responseData,
                  description: e.target.value,
                });
              }}
              type="text"
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
