import React from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/styles.module.css';

const modalRootElement = document.getElementById('modal-overlay');

function Modal({ onClose, children, name }) {
  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    });
  }, [onClose]);
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.modalHeaderWrapper} mt-10 ml-10 mr-10`}>
          <h2 className={`${styles.modalHeader} text text_type_main-large`}>{name}</h2>
          <button className={styles.modalButton} onClick={onClose}>
            <CloseIcon className={styles.modalCloseIcon} type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRootElement,
  );
}
export default Modal;
