import { createContext } from 'react';

type collectionType = {
  id: string;
  title: string;
};

interface CollectionsContextType {
  collectionsModal: CollectionModals;
  setCollectionsModal: React.Dispatch<React.SetStateAction<CollectionModals>>;
  collection: collectionType;
  setCollection: React.Dispatch<React.SetStateAction<collectionType>>;

  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

export const CollectionsContext = createContext(<CollectionsContextType>{});
