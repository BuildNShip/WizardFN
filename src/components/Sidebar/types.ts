export type ProjectType = {
  id: string;
  updated_by: string;
  title: string;
  token: string | null;
  updated_at: string;
  code: string;
  selected: boolean;
};

export type ProjectModals = {
    isCreateProjectModalOpen: boolean;
    isDeleteProjectModalOpen: boolean;
    isEditProjectModalOpen: boolean;
}
