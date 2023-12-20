import { SetStateAction, useState } from "react";
import styles from "./Collections.module.css"
import { buttons } from "./CollectionsData.ts"


const Collections = () => {
    const [openMenus, setOpenMenus] = useState<number[]>([]);

    const handleSubMenuToggle = (index: number) => {
        const updatedMenus = [...openMenus];
        const currentIndex = updatedMenus.indexOf(index);

        if (currentIndex !== -1) {
            updatedMenus.splice(currentIndex, 1);
        } else {
            updatedMenus.push(index);
        }

        setOpenMenus(updatedMenus);
    };

    const renderSubMenu = (submenu: any[], level = 2) => {
        return (
          <ul className={`submenu level-${level}`}>
            {submenu.map((item, subIndex) => (
              <li key={subIndex}>
                {item.title}
                {item.children && openMenus.includes(subIndex) && renderSubMenu(item.children, level + 1)}
              </li>
            ))}
          </ul>
        );
      };

    return (
        <div className={styles.collectionsContainer}>
            <div className={styles.collectionsTopbar}>
                <div className={styles.collectionsTopbarUsername}>
                    <div className={styles.collectionTopbarAvatar}>S</div>
                    <div className={styles.collectionTopbarName}>Salman Faariz</div>
                </div>
            </div>
            <div className={styles.collectionsMenuContainer}>
                <div className={styles.searchBar}>
                    <input className={styles.searchMenu} type="text" placeholder="Search files, teams or people" />
                </div>
                <div className={styles.collectionsMenu}>
                    <nav>
                        <ul className="menu">
                            {buttons.map((button, index) => (
                                <li key={index}>
                                    <p onClick={() => handleSubMenuToggle(index)}>
                                        {button.title}
                                    </p>
                                    {button.children && openMenus.includes(index) && renderSubMenu(button.children)}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Collections