import { useState, useContext, useEffect } from 'react';
import styles from './Collections.module.css';
import { buttons } from './CollectionsData.ts';
import { IoIosMenu } from 'react-icons/io';

import { FaTriangleExclamation } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import { UserContext } from '../../pages/MainPage/context';

import RightClickMenu from '../RightClickMenu/RightClickMenu.tsx';
const Collections = () => {
  type Button = {
    url: string;
    title: string;
    icon?: string;
    children?: Button[];
  };

  const { isLoggedIn, email } = useContext(UserContext);
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [points, setPoints] = useState({ top: 0, left: 0 });

  const [rightClickMenu, setRightClickMenu] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setRightClickMenu(false);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

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

  const menuItems: MenuItem[] = [
    {
      label: 'Create Collections',
      onClick: () => {},
    },
    {
      label: 'Create Project',
      onClick: () => {},
    },
  ];

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
    <>
      <div className={styles.collectionsContainer}>
        <div className={styles.collectionsTopbar}>
          <div className={styles.row}>
            <div className={styles.collectionsTopbarUsername}>
              <div className={styles.collectionTopbarAvatar}>
                {!isLoggedIn
                  ? 'G'
                  : email.split('@')[0].charAt(0).toUpperCase()}
              </div>
              <div className={styles.collectionTopbarName}>
                {!isLoggedIn ? 'Guest User' : email.split('@')[0]}
              </div>
            </div>
            {!isLoggedIn && (
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

          <button
            onContextMenu={(e) => {
              e.preventDefault();
              setRightClickMenu(true);
              setPoints({
                top: e.clientY,
                left: e.clientX,
              });
            }}
            className={styles.addButton}
          >
            +
          </button>
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
      {rightClickMenu && (
        <div
          className={styles.rightClickMenuContainer}
          style={{ top: points.top, left: points.left }}
        >
          <RightClickMenu menuItems={menuItems} />
        </div>
      )}
    </>
  );
};

export default Collections;
