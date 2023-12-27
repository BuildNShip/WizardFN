type Collection = {
  id: string;
  updated_by: string;
  title: string;
  order: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  project_id: string;
  endpoints: any[]; // You can replace 'any' with a more specific type if needed
};

type CollectionModals = {
  isCreateCollectionModalOpen: boolean;
  isEditCollectionModalOpen: boolean;
  isDeleteCollectionModalOpen: boolean;
};
