import { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import styles from './ModalContentStyles.module.css';
import {
  generateOTP,
  login,
  preRegister,
  register,
} from '../../../../../apis/authentication';
import { ModalTriggersType } from '../types';
import PrimaryButton from '../../Buttons/PrimaryButton';

const RegisterOTP = ({
  email,
  modalTriggers,
  setModalTriggers,
  Modalname,
  modalType,
}: {
  email: string;
  modalTriggers: ModalTriggersType;
  setModalTriggers: (modalTriggers: ModalTriggersType) => void;
  Modalname: string;
  modalType: string;
}) => {
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
                      'loginWithOTP',
                    );
                  else register(email, otp, setModalTriggers, modalTriggers);
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
