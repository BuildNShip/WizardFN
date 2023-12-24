import toast from 'react-hot-toast';
import { publicGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';
import { ModalTriggersType } from '../pages/MainPage/components/TopBar/types';

export const preRegister = async (
  email: string,
  setShowOTP: React.Dispatch<React.SetStateAction<boolean>>,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void
) => {
  console.log(
    import.meta.env.VITE_BACKEND_URL +
      buildVerse.preRegister,
  );

  publicGateway
    .post(buildVerse.preRegister, {
      email: email,
    })
    .then((response) => {
      toast.success('OTP sent to your email');
      setShowOTP(true);
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        isRegisterModalOpen: false,
        isLoginModalOpen: true,
        isForgetPasswordModalOpen: false,
      });
      return error.response.data;
    });
};

export const register = async (
  email: string,
  otp: string,
) => {
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

export const login = async (
  email: string,
  password: string,
) => {
  const config = {
    headers: {
      timezone:
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      product: 'buildverse',
    },
  };

  publicGateway
    .post(
      buildVerse.login,
      {
        email: email,
        password: password,
      },
      config,
    )
    .then((response) => {
      toast.success('Logged In');
      console.log(response);
    })
    .catch((error) => {
      toast.error('Something Went Wrong');
      console.log(error);
    });
};

export const generateOTP = async (email: string) => {
  publicGateway
    .post(buildVerse.generateOTP, {
      email: email,
    })
    .then((response) => {
      toast.success('OTP sent to your email');

      console.log(response);
    })
    .catch((error) => {
      toast.error('Something Went Wrong');
      console.log(error);
    });
};

export const forgetPassword = async (
  email: string,
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  publicGateway
    .post(buildVerse.forgetPassword, {
      email: email,
    })
    .then((response) => {
      toast.success(
        'Reset Password Link Sent to your email',
      );
      setOtpSent(true);
      console.log(response);
    })
    .catch((error) => {
      toast.error('Something Went Wrong');
      console.log(error);
    });
};

export const resetPassword = async (
  email: string,
  name: string,
  profilePic: string,
  unqiueString: string,
  password: string,
) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('profile_pic', profilePic);
  formData.append('password', password);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  publicGateway
    .post(
      buildVerse.resetPassword + unqiueString + '/',
      formData,
      config,
    )
    .then((response) => {
      toast.success('Password Resetted Successfully');
      console.log(response);
    })
    .catch((error) => {
      toast.error('Something Went Wrong');
      console.log(error);
    });
};
