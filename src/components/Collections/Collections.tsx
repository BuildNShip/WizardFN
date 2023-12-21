import { useState } from "react";
import styles from "./Collections.module.css"
import { buttons } from "./CollectionsData.ts"
import { IoIosMenu } from "react-icons/io";


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
            <ul className={`submenuLevel${level}`} style={{ margin: "1rem" }}>
                {submenu.map((item, subIndex) => (
                    <li className={styles.listItem} key={subIndex} style={{ margin: "1rem" }}>
                        <p onClick={() => handleSubMenuToggle(subIndex)}>
                            {item.title}
                            {item.children && <IoIosMenu size={15} />}
                        </p>
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
                        <ul className={styles.menu}>
                            {buttons.map((button, index) => (
                                <li className={styles.listItem} key={index} style={{ margin: "1rem", marginLeft: 0 }}>
                                    <p onClick={() => handleSubMenuToggle(index)}>
                                        <div className={styles.row}>
                                            <i className={`${button.icon} ${styles.listIcon}`} />{button.title}
                                        </div>
                                        {button.children && <IoIosMenu size={20} />}
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