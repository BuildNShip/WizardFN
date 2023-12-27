import { createContext } from 'react';
import { ModalTriggersType } from './types';

interface ModalContextType {
  modalTriggers: ModalTriggersType;
  setModalTriggers: (modalTriggers: ModalTriggersType) => void;
  email: string;
  setEmail?: (email: string) => void;
}

export const ModalContext = createContext(<ModalContextType>{});
