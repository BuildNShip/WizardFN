import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getProfileInfo = async () => {
  privateGateway
    .get(buildVerse.profileInfo)
    .then((response) => {
      console.log(response);
      localStorage.setItem(
        'profileInfo',
        JSON.stringify(response.data.response),
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
