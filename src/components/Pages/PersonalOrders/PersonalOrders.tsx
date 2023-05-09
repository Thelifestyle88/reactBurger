import { useAppDispatch, useAppSelector } from '../../..';
import styles from './styles/personalOrders.module.css';
import { Link } from 'react-router-dom';
import { logOutProfile } from '../../../services/actions/logInOutProfile';
import { TOrder } from '../../../utils/typesData';
import { OrderFeedDetails } from '../../OrderFeedDetails/OrderFeedDetails';
import { wsConnection, wcConnectionClosed } from '../../../services/middleware/wsActionsType';

export function PersonalOrders() {
  const orders = useAppSelector((store) => store.getAllOrderReducer.orders.orders);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.getAllOrderReducer.status);
  const connect = (wsUrl: string) => dispatch(wsConnection(wsUrl));
  const disconnect = (wsUrl: string) => dispatch(wcConnectionClosed(wsUrl));
  const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
  console.log(accessToken);
  console.log(orders);

  if (isLoading === 'CONNECTING...') {
    return <p>Загрузка...</p>;
  }

  return (
    <section>
      <div className={styles.profileListWrapper}>
        <ul className={`${styles.profileList} text text_type_main-medium`}>
          <li className={styles.profileListItem}>
            <Link to={'/profile'} className={styles.profileLink}>
              Профиль
            </Link>
          </li>
          <li className={styles.profileListItem}>
            <Link
              to={'/profile/orders'}
              onClick={() => {
                disconnect('wss://norma.nomoreparties.space/orders/all');
                connect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
              }}
              className={styles.profileLink}>
              История заказов
            </Link>
          </li>
          <li className={styles.profileListItem}>
            <Link
              to={'/'}
              onClick={() => {
                dispatch(logOutProfile());
              }}
              className={styles.profileLink}>
              Выход
            </Link>
          </li>
        </ul>
        <p
          className={`${styles.profileText} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={`${styles.ordersWrapper} custom-scroll`}>
        {orders.map((order: TOrder) => {
          return <OrderFeedDetails order={order} key={order._id} date={order.createdAt} />;
        })}
      </div>
    </section>
  );
}
