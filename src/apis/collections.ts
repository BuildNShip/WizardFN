import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getProjects = async () => {
  return privateGateway
    .get(buildVerse.getProjects)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
