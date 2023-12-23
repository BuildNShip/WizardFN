import toast from 'react-hot-toast';
import { publicGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const preRegister = async (email: string) => {
  console.log(import.meta.env.VITE_BACKEND_URL + buildVerse.preRegister);

  publicGateway
    .post(buildVerse.preRegister, {
      email: email,
    })
    .then((response) => {
      toast.success('OTP sent to your email');
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return error.response.data;
    });
};

export const register = async (email: string, otp: string) => {
  publicGateway
    .post(buildVerse.register, {
      email: email,
      otp: otp,
    })
    .then((response) => {
      toast.success('Registered');
      console.log(response);
    })
    .catch((error) => {
      toast.error('Something Went Wrong');
      console.log(error);
    });
};
