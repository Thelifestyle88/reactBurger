import style from './styles/style.module.css';

export function ModalOverlay(props) {
  return <div onClick={props.onClose} className={style.modalOverlay}></div>;
}
