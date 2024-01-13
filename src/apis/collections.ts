import toast from 'react-hot-toast';
import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getCollections = async (
  projectId: string,
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>,
) => {
  if (projectId.length > 0)
    privateGateway
      .get(buildVerse.getCollections(projectId))
      .then((response) => {
        setCollections(response.data.response.collections);
      })
      .catch((error) => {
        console.log(error);
      });
};

export const createCollections = async (
  projectId: string,
  title: string,
  setCollections: any,
  collectionsModal: CollectionModals,
  setCollectionsModal: React.Dispatch<React.SetStateAction<CollectionModals>>,
) => {
  if (projectId) {
    privateGateway
      .post(buildVerse.createCollection(projectId), {
        title: title,
      })
      .then((response) => {
        setCollectionsModal({
          ...collectionsModal,
          isCreateCollectionModalOpen: false,
        });
        getCollections(projectId, setCollections);
        console.log(response);
        toast.success('Collection created successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Collection creation failed');
      });
  } else {
    toast.error('Please select a project');
  }
};

export const editCollection = async (
  projectId: string,
  collectionId: string,
  title: string,
  setCollections: any,
  collectionsModal: CollectionModals,
  setCollectionsModal: React.Dispatch<React.SetStateAction<CollectionModals>>,
) => {
  privateGateway
    .put(buildVerse.editDeleteCollection(projectId, collectionId), {
      title: title,
    })
    .then((response) => {
      setCollectionsModal({
        ...collectionsModal,
        isEditCollectionModalOpen: false,
      });
      getCollections(projectId, setCollections);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCollection = async (
  projectId: string,
  collectionId: string,
  setCollections: any,
  collectionsModal: CollectionModals,
  setCollectionsModal: React.Dispatch<React.SetStateAction<CollectionModals>>,
) => {
  privateGateway
    .delete(buildVerse.deleteCollection(projectId, collectionId))
    .then((response) => {
      setCollectionsModal({
        ...collectionsModal,
        isDeleteCollectionModalOpen: false,
      });
      getCollections(projectId, setCollections);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
