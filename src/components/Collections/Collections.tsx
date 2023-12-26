import { useEffect, useState } from 'react';
import styles from './Collections.module.css';
import { buttons } from './CollectionsData.ts';
import { IoIosMenu } from 'react-icons/io';

import { FaTriangleExclamation } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import { useJwt } from 'react-jwt';
import { getProjects } from '../../apis/collections.ts';

const Collections = () => {
  type Button = {
    url: string;
    title: string;
    icon?: string;
    children?: Button[];
  };

  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [isGuest, setIsGuest] = useState<boolean>(true);
  let { decodedToken } = useJwt(localStorage.getItem('refreshToken')!);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    getProjects();

    if (localStorage.getItem('profileInfo') !== null)
      setEmail(JSON.parse(localStorage.getItem('profileInfo')!)?.email);

    setIsGuest((decodedToken as { is_guest: boolean })?.is_guest);
  }, [decodedToken]);

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

  const renderSubMenu = (submenu: Button[], level = 2) => {
    return (
      <ul className={`submenuLevel${level}`} style={{ margin: '1rem' }}>
        {submenu.map((item, subIndex) => (
          <li
            className={styles.listItem}
            key={subIndex}
            style={{ margin: '1rem 2.5rem' }}
          >
            <p onClick={() => handleSubMenuToggle(subIndex)}>
              {item.title}
              {item.children && <IoIosMenu size={15} />}
            </p>
            {item.children &&
              openMenus.includes(subIndex) &&
              renderSubMenu(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.collectionsContainer}>
      <div className={styles.collectionsTopbar}>
        <div className={styles.row}>
          <div className={styles.collectionsTopbarUsername}>
            <div className={styles.collectionTopbarAvatar}>
              {isGuest ? 'G' : email?.split('@')[0].charAt(0).toUpperCase()}
            </div>
            <div className={styles.collectionTopbarName}>
              {isGuest ? 'Guest User' : email?.split('@')[0]}
            </div>
          </div>
          {isGuest && (
            <>
              <FaTriangleExclamation
                data-tooltip-id="guest-tooltip"
                data-tooltip-content="Guest account data will be eraised within 2 days."
                size={25}
                className={styles.exclamationMark}
              />
              <Tooltip
                style={{
                  fontFamily: 'Inter',
                }}
                id="guest-tooltip"
                variant="dark"
              />
            </>
          )}
        </div>
        <button className={styles.addButton}>+</button>
      </div>

      <div className={styles.collectionsMenuContainer}>
        <div className={styles.searchBar}>
          <input
            className={styles.searchMenu}
            type="text"
            placeholder="Search files, teams or people"
          />
        </div>

        <div className={styles.collectionsMenu}>
          <nav>
            <ul className={styles.menu}>
              {buttons.map((button, index) => (
                <li
                  className={styles.listItem}
                  key={index}
                  style={{ margin: '1rem', marginLeft: 0 }}
                >
                  <p onClick={() => handleSubMenuToggle(index)}>
                    <div className={styles.row}>
                      <div className={`${button.icon} ${styles.listIcon}`} />
                      {button.title}
                    </div>
                    {button.children && <IoIosMenu size={20} />}
                  </p>

                  {button.children &&
                    openMenus.includes(index) &&
                    renderSubMenu(button.children)}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Collections;
