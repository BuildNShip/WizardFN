import toast from 'react-hot-toast';
import { privateGateway, publicGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';
import { ModalTriggersType } from '../pages/MainPage/components/TopBar/types';

export const mergeAccount = async (
  email: string,
  transfer: boolean,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
) => {
  privateGateway
    .post(buildVerse.mergeAccount, {
      email: email,
      old_token: localStorage.getItem('old_refresh_token'),
      transfer: transfer,
    })
    .then((response) => {
      toast.success('Account Merged');
      setModalTriggers({
        ...modalTriggers,
        askMergePopup: false,
      });
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        askMergePopup: false,
      });
      console.log(error);
    });
};

export const guestRegister = async () => {
  publicGateway
    .post(buildVerse.guestRegister)
    .then((response) => {
      if (
        response.data.response &&
        response.data.response.access_token
      ) {
        localStorage.setItem(
          'accessToken',
          response.data.response.access_token,
        );
        localStorage.setItem(
          'refreshToken',
          response.data.response.refresh_token,
        );
      }

      return response.data.response;
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      return error.response.data;
    });
};

export const preRegister = async (
  email: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
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
      setModalTriggers({
        ...modalTriggers,
        isRegisterModalOpen: true,
        showBinaryPopup: false,
      });
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: true,
        isRegisterModalOpen: false,
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
  modalTriggers: ModalTriggersType,
) => {
  publicGateway
    .post(buildVerse.register, {
      email: email,
      otp: otp,
    })
    .then((response) => {
      toast.success('Your are Registered');

      if (localStorage.getItem('refreshToken') !== null) {
        localStorage.setItem(
          'old_refresh_token',
          localStorage.getItem('refreshToken') as string,
        );
        localStorage.setItem(
          'refreshToken',
          response.data.response.refresh_token,
        );
        localStorage.setItem(
          'accessToken',
          response.data.response.access_token,
        );
      }

      setModalTriggers({
        ...modalTriggers,
        isRegisterModalOpen: false,
        askMergePopup: true,
      });
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isRegisterModalOpen: false,
      });
      console.log(error);
    });
};

export const login = async (
  email: string,
  password: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
  type?: string,
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
        ...modalTriggers,
        isLoginModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isRegisterModalOpen: false,
        askMergePopup: true,
      });

      if (localStorage.getItem('refreshToken') !== null) {
        localStorage.setItem(
          'old_refresh_token',
          localStorage.getItem('refreshToken') as string,
        );
        localStorage.setItem(
          'refreshToken',
          response.data.response.refresh_token,
        );
        localStorage.setItem(
          'accessToken',
          response.data.response.access_token,
        );
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: true,
        isLoginWithOTPModalOpen: false,
        isRegisterModalOpen: false,
      });
      console.log(error);
    });
};

export const generateOTP = async (
  email: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
  type?: string,
) => {
  publicGateway
    .post(buildVerse.generateOTP, {
      email: email,
      type: type,
    })
    .then((response) => {
      toast.success('OTP sent to your email');

      if (type === 'Login')
        setModalTriggers({
          ...modalTriggers,
          isRegisterModalOpen: true,
        });
      else {
        setModalTriggers({
          ...modalTriggers,
          isRegisterModalOpen: false,
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
  otp: string,
  password: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
) => {
  publicGateway
    .post(buildVerse.resetPassword, {
      email: email,
      otp: otp,
      password: password,
    })
    .then((response) => {
      toast.success('Password Resetted Successfully');
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        askMergePopup: true,
      });

      if (localStorage.getItem('refreshToken') !== null) {
        localStorage.setItem(
          'old_refresh_token',
          localStorage.getItem('refreshToken') as string,
        );
        localStorage.setItem(
          'refreshToken',
          response.data.response.refresh_token,
        );
        localStorage.setItem(
          'accessToken',
          response.data.response.access_token,
        );
      }

      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: true,
        isForgetPasswordModalOpen: false,
      });
      console.log(error);
    });
};

export const validateEmail = async (
  email: string,
  setModalTriggers: (
    modalTriggers: ModalTriggersType,
  ) => void,
  modalTriggers: ModalTriggersType,
) => {
  publicGateway
    .post(buildVerse.validateEmail, {
      email: email,
    })
    .then((response) => {
      toast.success('Email Validated');
      setModalTriggers({
        ...modalTriggers,
        isEmailValidated: false,
        isLoginModalOpen: true,
        showBinaryPopup: false,
      });
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        showBinaryPopup: true,
        isEmailValidated: false,
      });
      console.log(error);
    });
};
