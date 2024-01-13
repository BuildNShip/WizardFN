import styles from './ResponseView.module.css';
import PlusButton from '../PlusButton/PlusButton';
import ResponseContainer from './components/ResponseContainer/ResponseContainer';
import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../../context';

const ResponseView = () => {
  const [responseCount, setResponseCount] = useState(1);
  const { currentEndpoints: endpoints, setCurrentEndpoints: setEndpoints } =
    useContext(APIContext);

  const [responseData, setResponseData] = useState<ApiResponse[]>([]);

  useEffect(() => {
    setEndpoints({
      ...endpoints,
      apiResponses: responseData,
    });

    // responseData.push({
    //   responseCode: 0,
    //   body: '{}',
    //   isActive: false,
    //   description: '',
    //   order: responseCount,
    // });

    setResponseData([
      ...responseData,
      {
        responseCode: 0,
        body: '{}',
        isActive: false,
        description: '',
        order: responseCount,
      },
    ]);
  }, [responseCount]);

  return (
    <div className={styles.responsesViewContainer}>
      <div className={styles.responsesTypes}>
        <div className={`${styles.responseType} ${styles.active}`}>
          Responses
        </div>
        <div className={styles.responseType}>Analytics</div>
      </div>

      <div className={styles.responseView}>
        <div className={styles.responseViewInnerContainer}>
          <div className={styles.responseWithPlus}>
            {Array.from({ length: responseCount }).map((_, index) => (
              <ResponseContainer
                responseData={responseData}
                setResponseData={setResponseData}
                responseCount={index + 1}
              />
            ))}
            <PlusButton
              setResponseCount={setResponseCount}
              responseCount={responseCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseView;
