import { useState, useContext, useEffect } from 'react';
import styles from './Collections.module.css';
import { IoIosMenu } from 'react-icons/io';

import { FaTriangleExclamation } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import { UserContext } from '../../pages/MainPage/context';

import RightClickMenu from '../RightClickMenu/RightClickMenu.tsx';
import { deleteCollection, getCollections } from '../../apis/collections.ts';
import { CollectionsContext } from './context.ts';
import CreateEditModal from './ModalComponents/CreateEditModal/CreateEditModal.tsx';
import BinaryPopup from './ModalComponents/BinaryPopup/BinaryPopup.tsx';
const Collections = () => {
  type Button = {
    url: string;
    title: string;
    icon?: string;
    children?: Button[];
  };

  const {
    isLoggedIn,
    email,
    currentProject,
    setCurrentCollection,
    currentCollection,
  } = useContext(UserContext);
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [points, setPoints] = useState({ top: 0, left: 0 });
  const [rightClickMenu, setRightClickMenu] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [cRightClickMenu, setCRightClickMenu] = useState(false);
  const [cPoints, setCPoints] = useState({ top: 0, left: 0 });

  const [collectionsModal, setCollectionsModal] = useState<CollectionModals>({
    isCreateCollectionModalOpen: false,
    isEditCollectionModalOpen: false,
    isDeleteCollectionModalOpen: false,
  });

  useEffect(() => {
    const handleClick = () => {
      setRightClickMenu(false);
      setCRightClickMenu(false);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    getCollections(currentProject.id, setCollections);
  }, [currentProject]);

  useEffect(() => {
    if (collections.length > 0) {
      setCurrentCollection(collections[0]);
    }
  }, [collections]);

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
      onClick: () => {
        setCollectionsModal({
          ...collectionsModal,
          isCreateCollectionModalOpen: true,
        });
      },
    },
    {
      label: 'Create Project',
      onClick: () => {},
    },
  ];

  const CMenuItems: MenuItem[] = [
    {
      label: 'Edit Collection',
      onClick: () => {
        setCollectionsModal({
          ...collectionsModal,
          isEditCollectionModalOpen: true,
        });
      },
    },
    {
      label: 'Delete Collection',
      onClick: () => {
        setCollectionsModal({
          ...collectionsModal,
          isCreateCollectionModalOpen: false,
          isDeleteCollectionModalOpen: true,
        });
      },
    },
  ];

  const [collection, setCollection] = useState({
    title: '',
    id: '',
  });

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
    <CollectionsContext.Provider
      value={{
        collectionsModal,
        setCollectionsModal,
        collection,
        setCollection,
        collections,
        setCollections,
      }}
    >
      <>
        <BinaryPopup
          onClick={() => {
            deleteCollection(
              currentProject.id,
              collection.id,
              setCollections,
              collectionsModal,
              setCollectionsModal,
            );
          }}
          content={`Are you sure you want to delete ${collection.title}?`}
          buttonText="Delete Project"
          Modalname="isDeleteCollectionModalOpen"
          onClickCancel={() => {
            setCollectionsModal({
              ...collectionsModal,
              isDeleteCollectionModalOpen: false,
            });
          }}
        />
        <CreateEditModal />
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
                  {collections.map((collection, index) => (
                    <li
                      className={styles.listItem}
                      key={index}
                      style={{ margin: '1rem', marginLeft: 0 }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setCRightClickMenu(true);
                        setCPoints({
                          top: e.clientY,
                          left: e.clientX,
                        });

                        setCollection({
                          title: collection.title,
                          id: collection.id,
                        });
                      }}
                      onClick={() => {
                        setCurrentCollection(collection);
                      }}
                    >
                      <p onClick={() => handleSubMenuToggle(index)}>
                        <div className={styles.row}>
                          <div className={`red ${styles.listIcon}`} />
                          {collection.title}
                        </div>
                        {collection.endpoints.length > 0 && (
                          <IoIosMenu size={20} />
                        )}
                        {collection.id === currentCollection.id && (
                          <div className={styles.activeDot}></div>
                        )}
                      </p>

                      {collection.endpoints.length > 0 &&
                        openMenus.includes(index) &&
                        renderSubMenu(collection.endpoints)}
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

        {cRightClickMenu && (
          <div
            className={styles.rightClickMenuContainer}
            style={{ top: cPoints.top, left: cPoints.left }}
          >
            <RightClickMenu menuItems={CMenuItems} />
          </div>
        )}
      </>
    </CollectionsContext.Provider>
  );
};

export default Collections;
