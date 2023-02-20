import style from './styles/style.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay(props) {
  ModalOverlay.propTypes = {
    props: PropTypes.object,
  };

  return <div onClick={props.onClose} className={style.modalOverlay}></div>;
}
