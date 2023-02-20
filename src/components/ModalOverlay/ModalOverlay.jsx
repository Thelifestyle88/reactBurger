import style from './styles/style.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay(props) {
  console.log(props);
  return <div onClick={props.onClose} className={style.modalOverlay}></div>;
}
ModalOverlay.propTypes = {
  props: PropTypes.func,
};
