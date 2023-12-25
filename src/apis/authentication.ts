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
        isEmailValidated: false,
        showBinaryPopup: false,
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
        isEmailValidated: false,
        showBinaryPopup: false,
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
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  type?: string
) => {
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
    .post(buildVerse.login, data)
    .then((response) => {
      toast.success('Logged In');
      setModalTriggers({
        isRegisterModalOpen: false,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isEmailValidated: false,
        showBinaryPopup: false,
      });
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        isRegisterModalOpen: false,
        isLoginModalOpen: true,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isEmailValidated: false,
        showBinaryPopup: false,
      });
      console.log(error);
    });
};

export const generateOTP = async (
  email: string,
  setShowOTP: React.Dispatch<React.SetStateAction<boolean>>,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  type?: string,
) => {
  publicGateway
    .post(buildVerse.generateOTP, {
      email: email,
      type: type,
    })
    .then((response) => {
      toast.success('OTP sent to your email');
      setShowOTP(true);

      if (type === 'Login')
        setModalTriggers({
          isRegisterModalOpen: true,
          isLoginModalOpen: false,
          isForgetPasswordModalOpen: false,
          isLoginWithOTPModalOpen: true,
          isEmailValidated: false,
          showBinaryPopup: false,
        });
      else {
        setModalTriggers({
          isRegisterModalOpen: false,
          isLoginModalOpen: false,
          isForgetPasswordModalOpen: false,
          isLoginWithOTPModalOpen: false,
          isEmailValidated: false,
          showBinaryPopup: false,
        });
      }

      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      console.log(error);
    });
};

export const resetPassword = async (
  email: string,
  unqiueString: string,
  password: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const formData = new FormData();
  formData.append('email', email);
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
        isEmailValidated: false,
        showBinaryPopup: false,
      });

      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setOtpSent(false);
      console.log(error);
    });
};

export const validateEmail = async (
  email: string,
  setModalTriggers?: (
    modalTriggers: ModalTriggersType,
  ) => void,
) => {
  publicGateway
    .post(buildVerse.validateEmail, {
      email: email,
    })
    .then((response) => {
      toast.success('Email Validated');
      if (setModalTriggers)
        setModalTriggers({
          isRegisterModalOpen: false,
          isLoginModalOpen: false,
          isForgetPasswordModalOpen: false,
          isLoginWithOTPModalOpen: true,
          isEmailValidated: false,
          showBinaryPopup: false,
        });
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      if (setModalTriggers)
      setModalTriggers({
        isRegisterModalOpen: true,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isEmailValidated: false,
        showBinaryPopup: false,
      });
      console.log(error);
    });
};
