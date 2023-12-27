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
  privateGateway
    .post(buildVerse.createCollection(projectId), {
      title: title,
    })
    .then((response) => {
      getCollections(projectId, setCollections);
      setCollectionsModal({
        ...collectionsModal,
        isCreateCollectionModalOpen: false,
      });
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
