import { store, useAppSelector } from '../../index';
import styles from './styles/orderFeed.module.css';
import { OrderFeedDetails } from '../OrderFeedDetails/OrderFeedDetails';
import { TIngredient, TOrder } from '../../utils/typesData';

export function OrderFeed() {
  const ingredients = useAppSelector((store) => store.burgerIngredientReducer.burgerIngredientData);
  const ordersInformation = useAppSelector((store) => store.getAllOrderReducer.orders);
  const orders = useAppSelector((store) => store.getAllOrderReducer.orders.orders);
  const isLoading = useAppSelector((store) => store.getAllOrderReducer.status);
  const maxShownIngredients = 6;
  const countOfIngredients = ingredients.length;
  const countOfHiddenIngredients = countOfIngredients - maxShownIngredients;
  const orderNumberDone = orders.map((item) => {
    if (item.status === 'done') {
      return item.number;
    } else return null;
  });
  const orderNumberInProgress = orders.map((item) => {
    if (item.status !== 'done') {
      return item.number;
    } else return null;
  });

  console.log(orders);

  if (isLoading === 'CONNECTING...') {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <h1 className={`${styles.orderHeader} mt-10`}>Лента заказов</h1>
      <section className={styles.sectionWrapper}>
        <div className={`${styles.ordersWrapper} custom-scroll`}>
          {orders.map((order: TOrder) => {
            return <OrderFeedDetails order={order} key={order._id} date={order.createdAt} />;
          })}
        </div>
        <div className={styles.orderStats}>
          <div className={styles.orderListWrapper}>
            <div className={styles.orderListsWrapper}>
              <h3 className={`${styles.orderListTitle} text text_type_main-small`}>Готовы:</h3>
              <ul className={`${styles.orderList} custom-scroll`}>
                {orderNumberDone.map((item) => {
                  return (
                    <li className={`${styles.textDone} text text_type_digits-default`}>{item}</li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.orderListsWrapper}>
              <h3 className={`${styles.orderListTitle} text text_type_main-small`}>В работе:</h3>
              <ul className={`${styles.orderList} custom-scroll`}>
                {orderNumberInProgress.map((item) => {
                  return <li className="text_type_digits-default">{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text_type_main-small">Выполнено за всё время:</h4>
            <p className="text text_type_digits-large">{ordersInformation.total}</p>
          </div>
          <div>
            <h4 className="text_type_main-small">Выполнено за сегодня:</h4>
            <p className="text text_type_digits-large">{ordersInformation.totalToday}</p>
          </div>
        </div>
      </section>
    </>
  );
}
