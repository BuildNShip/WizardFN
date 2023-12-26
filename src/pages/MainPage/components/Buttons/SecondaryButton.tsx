import styles from './Buttons.module.css';

const SecondaryButton = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <>
      <button onClick={onClick} className={styles.secondaryButton}>
        {buttonText}
      </button>
    </>
  );
};

export default SecondaryButton;
