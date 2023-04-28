import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/styles.module.css';

const modalRootElement: any = document.getElementById('modal-overlay');

export type TModalProps = {
  onClose: () => void;
  children: ReactElement;
  name: string;
};

function Modal({ onClose, children, name }: TModalProps) {
  React.useEffect(() => {
    function closeByEscape(evt: any) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.modalHeaderWrapper} mt-10 ml-10 mr-10`}>
          <h2 className={`${styles.modalHeader} text text_type_main-large`}>{name}</h2>
          <button className={styles.modalButton} onClick={onClose}>
            <CloseIcon type="primary" />
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
