import { ReactElement } from 'react';
import style from './styles/style.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};

export function ModalOverlay(props: TModalOverlayProps) {
  return <div onClick={props.onClose} className={style.modalOverlay}></div>;
}
