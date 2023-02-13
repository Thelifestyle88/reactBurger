import doneOrder from '../../images/done.png';
import styles from './styles/styles.module.css';

export function OrderDetails(order) {
  return (
    <div className={styles.orderDetailsWrapper}>
      <h2 className="text text_type_digits-large mb-8">1234567890</h2>
      <h3 className="text text_type_main-medium mb-15">Идентификатор заказа</h3>
      <img className={`${styles.orderDetailsImage} mb-15`} src={doneOrder} alt="done" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
