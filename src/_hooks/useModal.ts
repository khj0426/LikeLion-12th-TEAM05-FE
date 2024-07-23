import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  return {
    modal,
    setModal,
    openModal,
    closeModal,
    toggleModal,
  };
};
