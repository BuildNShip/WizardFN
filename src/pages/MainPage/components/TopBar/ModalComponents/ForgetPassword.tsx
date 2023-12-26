import { useEffect, useState } from 'react';
import { generateOTP, resetPassword } from '../../../../../apis/authentication';
import Modal from '../../Modal/Modal';
import styles from './ModalContentStyles.module.css';
import { ModalTriggersType } from '../types';
import PrimaryButton from '../../Buttons/PrimaryButton';

const ForgetPassword = ({
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
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (
      modalTriggers[Modalname as keyof ModalTriggersType] ||
      modalType === 'forgetPassword'
    ) {
      generateOTP(email, setModalTriggers, modalTriggers, 'Forget Password');
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
            <div className={styles.modalTitle}>Forget Password</div>

            {/* <div className={styles.modalInputContainer}>
                                <div className={styles.modalInputLabel}>
                                    Email Address<span>*</span>
                                </div>
                                <input value={email} placeholder="Enter your email address" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} className={styles.modalInput} type="text" />
                            </div> */}
            <p className={styles.emailLabel}>{email}</p>

            <div className={styles.modalInputContainer}>
              <div className={styles.modalInputLabel}>
                Enter OTP<span>*</span>
              </div>
              <input
                placeholder="Enter OTP"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                className={styles.modalInput}
                type="text"
              />
            </div>

            <div className={styles.modalInputContainer}>
              <div className={styles.modalInputLabel}>
                Enter Password<span>*</span>
              </div>
              <input
                placeholder="Enter your new Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={styles.modalInput}
                type="password"
              />
            </div>

            <div className={styles.modalButtonContainer}>
              <PrimaryButton
                onClick={() => {
                  resetPassword(
                    email,
                    otp,
                    password,
                    setModalTriggers,
                    modalTriggers,
                  );
                }}
                ButtonText="Reset Password"
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <hr className={styles.horizontalLine} />
            <div className={styles.subTexts}>
              <p
                onClick={() => {
                  setModalTriggers({
                    ...modalTriggers,
                    isForgetPasswordModalOpen: false,
                    isLoginModalOpen: true,
                  });
                }}
                className={styles.subText}
              >
                Remembered your password? <span>Login</span>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ForgetPassword;
