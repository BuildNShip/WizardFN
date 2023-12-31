export const buildVerse = {
  // Authentication URLs
  preRegister: '/buildverse/pre-register/',
  register: '/buildverse/register/',
  generateOTP: '/buildverse/generate-otp/',
  forgetPassword: '/buildverse/forgot-password/',
  resetPassword: '/buildverse/reset-password/',
  updateProfile: '/buildverse/update-profile/',
  info: '/buildverse/info/',
  login: '/buildverse/login/',
  getAccessToken: '/buildverse/get-access-token/',
  validateEmail: '/buildverse/check-email-status/',

  // Guest URLs
  guestRegister: '/wizardapi/guest-register/',
  mergeAccount: '/wizardapi/switch-to-login/',
  profileInfo: '/buildverse/profile-info/',

  // Project URLs
  getProjects: '/wizardapi/project/list/',
  createProject: '/wizardapi/project/create/',
  editDeleteProject: '/wizardapi/project/',

  // Collection URLs
  getCollections: (projectId: string) =>
    `/wizardapi/project/${projectId}/collection/list/`,
  createCollection: (projectId: string) =>
    `/wizardapi/project/${projectId}/collection/create/`,
  editDeleteCollection: (projectId: string, collectionId: string) =>
    `/wizardapi/project/${projectId}/collection/${collectionId}/edit/`,
  deleteCollection: (projectId: string, collectionId: string) =>
    `/wizardapi/project/${projectId}/collection/${collectionId}/delete/`,

  // Endpoint URLs
  getEndpoints: (projectId: string, collectionId: string) =>
    `/wizardapi/project/${projectId}/collection/${collectionId}/get/`,
  saveEndpoint: `/wizardapi/endpoint/save/`,
};
