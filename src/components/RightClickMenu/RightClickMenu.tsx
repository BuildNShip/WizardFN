import styles from './RightClickMenu.module.css';

const RightClickMenu = ({
  menuItems,
}: {
  menuItems: { label: string; onClick?: () => void }[];
}) => {
  return (
    <div className={styles.messageStyles}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            <p className={styles.rightClickListItem}>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightClickMenu;
