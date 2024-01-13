import styles from './Buttons.module.css';

const PrimaryButton = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <>
      <button  onClick={onClick} className={styles.primaryButton}>
        {buttonText}
      </button>
    </>
  );
};

export default PrimaryButton;
