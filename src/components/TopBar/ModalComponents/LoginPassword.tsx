import { useState, useContext } from 'react';

import styles from './ModalContentStyles.module.css';

import { ModalTriggersType } from '../types';

import { ModalContext } from '../context';
import { UserContext } from '../../../pages/MainPage/context';
import Modal from '../../../pages/MainPage/components/Modal/Modal';
import PrimaryButton from '../../../pages/MainPage/components/Buttons/PrimaryButton';
import { login } from '../../../apis/authentication';
import SecondaryButton from '../../../pages/MainPage/components/Buttons/SecondaryButton';

const LoginPassword = ({ Modalname }: { Modalname: string }) => {
  const [password, setPassword] = useState('');
  const { modalTriggers, setModalTriggers, email } = useContext(ModalContext);
  const { setEmail } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(UserContext);
  return (
    <>
      {
        <>
          {modalTriggers[Modalname as keyof ModalTriggersType] && (
            <Modal
              modalTriggers={modalTriggers}
              setModalTriggers={setModalTriggers}
              Modalname={Modalname}
            >
              <div className={styles.modalContent}>
                <div className={styles.modalTitle}>Login</div>
                <p className={styles.emailLabel}>{email}</p>
                <div className={styles.modalInputContainer}>
                  <div className={styles.modalInputLabel}>
                    Password<span>*</span>
                  </div>
                  <input
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.modalInput}
                    type="password"
                  />
                </div>
                <div className={styles.modalButtonContainer}>
                  <PrimaryButton
                    buttonText="Login"
                    onClick={() =>
                      login(
                        email,
                        password,
                        setModalTriggers,
                        modalTriggers,
                        setIsLoggedIn,
                        setEmail,
                        'loginWithPassword',
                      )
                    }
                  />

                  <SecondaryButton
                    onClick={() => {
                      setModalTriggers({
                        isRegisterModalOpen: true,
                        isLoginModalOpen: false,
                        isForgetPasswordModalOpen: false,
                        isLoginWithOTPModalOpen: true,
                        isEmailValidated: false,
                        showBinaryPopup: false,
                        askMergePopup: false,
                      });
                    }}
                    buttonText="Login with OTP"
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
                        isLoginModalOpen: false,
                        isForgetPasswordModalOpen: true,
                      });
                    }}
                    className={styles.subText}
                  >
                    <span>Reset Password</span>
                  </p>
                </div>
              </div>
            </Modal>
          )}
        </>
      }
    </>
  );
};

export default LoginPassword;
