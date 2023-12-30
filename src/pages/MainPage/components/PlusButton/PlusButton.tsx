import styles from './PlusButton.module.css';
import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../../context';
import toast from 'react-hot-toast';

const PlusButton = ({
  setResponseCount,
  responseCount,
}: {
  setResponseCount: (count: number) => void;
  responseCount: number;
}) => {
  const { endpoints } = useContext(APIContext);
  const [isInvalidJSON, setIsInvalidJSON] = useState(true);

  useEffect(() => {
    if (!isInvalidJSON) {
      setResponseCount(responseCount + 1);
    }
  }, [isInvalidJSON]);

  useEffect(() => {}, []);

  return (
    <>
      <div
        onClick={() => {
          let currentResponse = endpoints.apiResponses.find(
            (item) => item.order === responseCount,
          );

          if (currentResponse?.body.toString() === '{}') {
            console.log(currentResponse?.body.toString());
            toast.error(
              'Kindly enter a valid JSON in the response body(empty)',
            );
            setIsInvalidJSON(true);
            return;
          }

          try {
            JSON.parse(currentResponse?.body as string);

            setIsInvalidJSON(false);
          } catch {
            console.log(currentResponse);
            console.log(endpoints);
            toast.error('Enter a valid JSON in the response body(catch)');
            setIsInvalidJSON(true);
          }
        }}
        className={styles.plusButtonContainer}
      >
        <div className={styles.line}></div>
        <div className={styles.plusButton}>+</div>
      </div>
    </>
  );
};

export default PlusButton;
