import { useContext, useEffect, useState } from 'react';
import styles from './TopBar.module.css';
import { LuUploadCloud } from 'react-icons/lu';
import RegisterOTP from './ModalComponents/RegisterOTP';
import LoginPassword from './ModalComponents/LoginPassword';
import ForgetPassword from './ModalComponents/ForgetPassword';
import { ModalTriggersType } from './types';

import ValidateEmail from './ModalComponents/ValidateEmail';
import BinaryPopup from './ModalComponents/BinaryPopup/BinaryPopup';

import toast from 'react-hot-toast';

import { ModalContext } from './context';
import { UserContext } from '../../pages/MainPage/context';
import { mergeAccount } from '../../apis/authentication';

const TopBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [modalTriggers, setModalTriggers] = useState<ModalTriggersType>({
    isRegisterModalOpen: false,
    isLoginModalOpen: false,
    isForgetPasswordModalOpen: false,
    isLoginWithOTPModalOpen: false,
    isEmailValidated: false,

    showBinaryPopup: false,
    askMergePopup: false,
  });

  const [modalType, setModalType] = useState('' as string);

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (modalTriggers.isLoginWithOTPModalOpen) setModalType('loginWithOTP');
    if (modalTriggers.isForgetPasswordModalOpen) setModalType('forgetPassword');
    if (
      modalTriggers.isRegisterModalOpen &&
      !modalTriggers.isLoginWithOTPModalOpen
    )
      setModalType('registerWithOTP');
  }, [modalTriggers]);

  return (
    <ModalContext.Provider
      value={{
        modalTriggers,
        setModalTriggers,
        email,
        setEmail,
      }}
    >
      <>
        {modalTriggers.askMergePopup && (
          <BinaryPopup
            onClick={() => {
              mergeAccount(true, setModalTriggers, modalTriggers);
            }}
            onClickCancel={() => {
              mergeAccount(false, setModalTriggers, modalTriggers);
            }}
            content={
              'There could be data associated with this temporary account. Do you want to merge it with your new account?'
            }
            Modalname="askMergePopup"
            buttonText={'Merge Accounts'}
          />
        )}

        <ValidateEmail Modalname="isEmailValidated" />

        <RegisterOTP Modalname="isRegisterModalOpen" modalType={modalType} />

        <LoginPassword Modalname="isLoginModalOpen" />

        <ForgetPassword
          Modalname="isForgetPasswordModalOpen"
          modalType={modalType}
        />

        <div className={styles.mainAppTopbar}>
          <div className={styles.topbarTabsContainer}>
            <div className={styles.topbarTabs}>
              <div className={styles.topbarTabActive}>
                <span className={styles.tabType}>Drafts</span>
                Untitled
              </div>
              <div className={styles.topbarTab}>Another Tab</div>
            </div>
            <div
              onClick={() => {
                setModalTriggers({
                  ...modalTriggers,
                  askMergePopup: true,
                });
              }}
              className={styles.topbarAddTab}
            >
              +
            </div>
            <div className={styles.shareButton}>Share</div>
          </div>

          <div className={styles.topbarActions}>
            <button className={styles.saveToWorkspace}>
              <LuUploadCloud className={styles.saveButton} /> Save My Workspace
            </button>
            <button
              className={styles.logoutButton}
              onClick={() => {
                if (!isLoggedIn) {
                  setModalTriggers({
                    ...modalTriggers,
                    isEmailValidated: true,
                  });
                } else {
                  localStorage.clear();
                  toast.success('Logged out successfully');
                  setIsLoggedIn(false);
                }
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </>
    </ModalContext.Provider>
  );
};

export default TopBar;
