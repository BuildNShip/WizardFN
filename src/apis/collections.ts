import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getCollections = async (
  projectId: string,
  setCollections: any,
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
