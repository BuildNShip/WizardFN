import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getProfileInfo = async (setEmail: {
  (email: string): void;
  (arg0: any): void;
}) => {
  privateGateway
    .get(buildVerse.profileInfo)
    .then((response) => {
      console.log(response);
      localStorage.setItem(
        'profileInfo',
        JSON.stringify(response.data.response),
      );

      if (response.data.response.email) setEmail(response.data.response.email);
    })
    .catch((error) => {
      console.log(error);
    });
};
