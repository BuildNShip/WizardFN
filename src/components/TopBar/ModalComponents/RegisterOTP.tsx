import { useEffect, useState, useContext } from 'react';

import styles from './ModalContentStyles.module.css';
import {
  generateOTP,
  login,
  preRegister,
  register,
} from '../../../apis/authentication';

import { ModalTriggersType } from '../types';


import { ModalContext } from '../context';
import { UserContext } from '../../../pages/MainPage/context';
import Modal from '../../../pages/MainPage/components/Modal/Modal';
import PrimaryButton from '../../../pages/MainPage/components/Buttons/PrimaryButton';


const RegisterOTP = ({
  Modalname,
  modalType,
}: {
  Modalname: string;
  modalType: string;
}) => {
  const { modalTriggers, setModalTriggers, email } = useContext(ModalContext);
  const { setEmail } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(UserContext);
  const [otp, setOTP] = useState('');
  useEffect(() => {
    if (!otp || otp.length === 0) {
      if (
        modalTriggers[Modalname as keyof ModalTriggersType] ||
        modalType === 'loginWithOTP'
      ) {
        if (modalType === 'loginWithOTP')
          generateOTP(email, setModalTriggers, modalTriggers, 'Login');
        if (modalType === 'registerWithOTP')
          preRegister(email, setModalTriggers, modalTriggers);
      }
    } else {
      setOTP('');
    }
  }, [modalType]);

  return (
    <>
      {modalTriggers[Modalname as keyof ModalTriggersType] && (
        <Modal
          modalTriggers={modalTriggers}
          setModalTriggers={setModalTriggers}
          Modalname={Modalname}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>
              {modalType === 'loginWithOTP' ? 'Login' : 'Register'} with OTP
            </div>
            <p className={styles.emailLabel}>{email}</p>
            <div className={styles.modalInputContainer}>
              <div className={styles.modalInputLabel}>Enter OTP</div>
              <input
                placeholder="Enter the OTP you received"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                className={styles.modalInput}
                type="number"
              />
            </div>
            <div className={styles.modalButtonContainer}>
              <PrimaryButton
                onClick={() => {
                  if (modalType === 'loginWithOTP')
                    login(
                      email,
                      otp,
                      setModalTriggers,
                      modalTriggers,
                      setIsLoggedIn,
                      setEmail,
                      'loginWithOTP',
                    );
                  else
                    register(
                      email,
                      otp,
                      setModalTriggers,
                      modalTriggers,
                      setEmail,
                      setIsLoggedIn,
                    );
                }}
                buttonText="Verify OTP"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterOTP;
