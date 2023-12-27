import styles from './RightClickMenu.module.css';

const RightClickMenu = () => {
  return (
    <div className={styles.messageStyles}>
      <ul>
        <li>
          <p className={styles.rightClickListItem}>Rename Project</p>
        </li>
        <li>
          <p className={styles.rightClickListItem}>Duplicate Project</p>
        </li>
        <li>
          <p className={styles.rightClickListItem}>Delete Project</p>
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
