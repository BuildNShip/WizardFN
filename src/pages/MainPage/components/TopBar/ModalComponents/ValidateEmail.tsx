import React from 'react'
import { ModalTriggersType } from '../types'
import styles from "./ModalContentStyles.module.css"
import PrimaryButton from '../../Buttons/PrimaryButton'
import Modal from '../../Modal/Modal'
import { validateEmail } from '../../../../../apis/authentication'

const ValidateEmail = ({ email, setEmail, modalTriggers, setModalTriggers, Modalname }: {
  email: string, setEmail: (email: string) => void,
  modalTriggers: ModalTriggersType, setModalTriggers: (modalTriggers: ModalTriggersType) => void, Modalname: string
}
) => {
  return (
    <>
      {modalTriggers && modalTriggers[Modalname as keyof ModalTriggersType] && (
        <Modal modalTriggers={modalTriggers} setModalTriggers={setModalTriggers} Modalname={Modalname}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>
              Login
            </div>
            <div className={styles.modalInputContainer}>
              <div className={styles.modalInputLabel}>
                Email Address<span>*</span>
              </div>
              <input value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className={styles.modalInput} type="text" />
            </div>
            <div className={styles.modalButtonContainer}>
              <PrimaryButton ButtonText="Validate Email" onClick={() => { validateEmail(email, setModalTriggers) }} />
            </div>
          </div>
        </Modal >
      )}

    </>
  )
}

export default ValidateEmail