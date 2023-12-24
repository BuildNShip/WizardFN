import toast from 'react-hot-toast';
import { publicGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';
import { ModalTriggersType } from '../pages/MainPage/components/TopBar/types';

export const preRegister = async (
  email: string,
  setShowOTP: React.Dispatch<React.SetStateAction<boolean>>,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
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
        isLoginWithOTPModalOpen: false,
      });
      return error.response.data;
    });
};

export const register = async (
  email: string,
  otp: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
) => {
  publicGateway
    .post(buildVerse.register, {
      email: email,
      otp: otp,
    })
    .then((response) => {
      toast.success('Your are Registered');
      console.log(response);
      setModalTriggers({
        isRegisterModalOpen: false,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
      });
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      console.log(error);
    });
};

export const login = async (
  email: string,
  password: string,
  type?: string,
) => {
  const config = {
    headers: {
      timezone:
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      product: 'buildverse',
    },
  };

  let data;

  if (type === 'loginWithOTP') {
    data = {
      email: email,
      otp: password,
    };
  } else {
    data = {
      email: email,
      password: password,
    };
  }

  publicGateway
    .post(buildVerse.login, data, config)
    .then((response) => {
      toast.success('Logged In');
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      console.log(error);
    });
};

export const generateOTP = async (
  email: string,
  setShowOTP: React.Dispatch<React.SetStateAction<boolean>>,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
) => {
  publicGateway
    .post(buildVerse.generateOTP, {
      email: email,
    })
    .then((response) => {
      toast.success('OTP sent to your email');
      setShowOTP(true);
      setModalTriggers({
        isRegisterModalOpen: true,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: true,
      });
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
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
      toast.error(error.response.data.message.general[0]);
      console.log(error);
    });
};

export const resetPassword = async (
  email: string,
  name: string,
  profilePic: string,
  unqiueString: string,
  password: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>,
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
      setModalTriggers({
        isRegisterModalOpen: false,
        isLoginModalOpen: true,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
      });

      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setOtpSent(false);
      console.log(error);
    });
};
