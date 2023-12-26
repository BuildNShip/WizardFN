import styles from './Buttons.module.css';

const PrimaryButton = ({
  ButtonText,
  onClick,
}: {
  ButtonText: string;
  onClick: () => void;
}) => {
  return (
    <>
      <button onClick={onClick} className={styles.primaryButton}>
        {ButtonText}
      </button>
    </>
  );
};

export default PrimaryButton;
