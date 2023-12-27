import { useContext } from 'react';
import styles from './RightClickMenu.module.css';
import { SidebarContext } from '../Sidebar/context';

const RightClickMenu = () => {
  const { projectModals, setProjectModals } =
    useContext(SidebarContext);
  useContext(SidebarContext);
  return (
    <div className={styles.messageStyles}>
      <ul>
        <li
          onClick={() => {
            setProjectModals({
              ...projectModals,
              isEditProjectModalOpen: true,
            });
          }}
        >
          <p className={styles.rightClickListItem}>Rename Project</p>
        </li>
        <li>
          <p className={styles.rightClickListItem}>Duplicate Project</p>
        </li>
        <li
          onClick={() => {
            setProjectModals({
              ...projectModals,
              isDeleteProjectModalOpen: true,
            });
          }}
        >
          <p className={styles.rightClickListItem}>Delete Project</p>
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
