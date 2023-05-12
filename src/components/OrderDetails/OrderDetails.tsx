import doneOrder from '../../images/done.png';
import styles from './styles/styles.module.css';

type TOrder = {
  order: TOrder2;
};

type TOrder2 = {
  number: number;
};

type TBurger = {
  order: TOrder;
};

export function OrderDetails(burger: TBurger) {
  const isNumberExist = burger.order.order.number;
  return (
    <>
      {isNumberExist && (
        <div data-testid={'orderId'} className={styles.orderDetailsWrapper}>
          <h2 className="text text_type_digits-large mb-8">{burger.order.order.number}</h2>
          <h3 className="text text_type_main-medium mb-15">Идентификатор заказа</h3>
          <img className={`${styles.orderDetailsImage} mb-15`} src={doneOrder} alt="done" />
          <p className="text text_type_main-small">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
}
