import toast from 'react-hot-toast';
import { privateGateway, publicGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

import { AxiosResponse } from 'axios';
import { getProfileInfo } from './user';
import { ModalTriggersType } from '../components/TopBar/types';

const mergeRefreshTokens = (response: AxiosResponse<any, any>) => {
  if (response.data.response && response.data.response.access_token) {
    if (localStorage.getItem('refreshToken') !== null)
      localStorage.setItem(
        'old_refresh_token',
        localStorage.getItem('refreshToken') as string,
      );
    localStorage.setItem('accessToken', response.data.response.access_token);
    localStorage.setItem('refreshToken', response.data.response.refresh_token);
  }
};

export const mergeAccount = async (
  transfer: boolean,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
) => {
  privateGateway
    .post(buildVerse.mergeAccount, {
      old_token: localStorage.getItem('old_refresh_token'),
      transfer: transfer,
    })
    .then(() => {
      if (transfer) toast.success('Accounts merged successfully');
      else toast.success('Accounts not merged');
      setModalTriggers({
        ...modalTriggers,
        askMergePopup: false,
      });

      localStorage.removeItem('old_refresh_token');
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        askMergePopup: false,
      });
    });
};

export const guestRegister = async () => {
  publicGateway
    .post(buildVerse.guestRegister)
    .then((response) => {
      localStorage.setItem('accessToken', response.data.response.access_token);
      localStorage.setItem(
        'refreshToken',
        response.data.response.refresh_token,
      );
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
    });
};

export const preRegister = async (
  email: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
) => {
  publicGateway
    .post(buildVerse.preRegister, {
      email: email,
    })
    .then((response) => {
      toast.success(response.data.message.general[0]);
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
    });
};

export const register = async (
  email: string,
  otp: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
  setEmail: (email: string) => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
) => {
  publicGateway
    .post(buildVerse.register, {
      email: email,
      otp: otp,
    })
    .then((response) => {
      toast.success(response.data.message.general[0]);

      mergeRefreshTokens(response);

      setModalTriggers({
        ...modalTriggers,
        isRegisterModalOpen: false,
        askMergePopup: true,
      });

      getProfileInfo(setEmail);
      setIsLoggedIn(true);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
    });
};

export const login = async (
  email: string,
  password: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setEmail: (email: string) => void,
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
      toast.success(response.data.message.general[0] || 'Logged in successfully');
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: false,
        isLoginWithOTPModalOpen: false,
        isRegisterModalOpen: false,
        askMergePopup: true,
      });
      setIsLoggedIn(true);
      mergeRefreshTokens(response);

      getProfileInfo(setEmail);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: true,
        isLoginWithOTPModalOpen: false,
        isRegisterModalOpen: false,
      });
    });
};

export const generateOTP = async (
  email: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
  type?: string,
) => {
  publicGateway
    .post(buildVerse.generateOTP, {
      email: email,
      type: type,
    })
    .then((response) => {
      toast.success(response.data.message.general[0]);

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
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
    });
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setEmail: (email: string) => void,
) => {
  publicGateway
    .post(buildVerse.resetPassword, {
      email: email,
      otp: otp,
      password: password,
    })
    .then((response) => {
      toast.success(response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: false,
        isForgetPasswordModalOpen: false,
        askMergePopup: true,
      });
      setIsLoggedIn(true);
      mergeRefreshTokens(response);

      getProfileInfo(setEmail);
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isLoginModalOpen: true,
        isForgetPasswordModalOpen: false,
      });
    });
};

export const validateEmail = async (
  email: string,
  setModalTriggers: (modalTriggers: ModalTriggersType) => void,
  modalTriggers: ModalTriggersType,
) => {
  publicGateway
    .post(buildVerse.validateEmail, {
      email: email,
    })
    .then((response) => {
      toast.success(response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        isEmailValidated: false,
        isLoginModalOpen: true,
        showBinaryPopup: false,
      });
    })
    .catch((error) => {
      toast.error(error.response.data.message.general[0]);
      setModalTriggers({
        ...modalTriggers,
        showBinaryPopup: true,
        isEmailValidated: false,
      });
    });
};
