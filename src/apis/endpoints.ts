import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getEndpoints = async (
  projectId: string,
  collectionId: string,
  setEndpoints: any,
) => {
  privateGateway
    .get(buildVerse.getEndpoints(projectId, collectionId))
    .then((response) => {
      console.log(response.data);
      setEndpoints(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
