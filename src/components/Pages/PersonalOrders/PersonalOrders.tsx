import { useAppDispatch, useAppSelector } from '../../..';
import styles from './styles/personalOrders.module.css';
import { Link, useLocation } from 'react-router-dom';
import { logOutProfile } from '../../../services/actions/logInOutProfile';
import { TOrder } from '../../../utils/typesData';
import { OrderFeedDetails } from '../../OrderFeedDetails/OrderFeedDetails';
import { wcConnectionClosed, wsConnection } from '../../../services/middleware/wsActionsType';
import { useEffect } from 'react';
import { addOrderFeedDetails } from '../../../services/actions/getOrdersFeedDetails';
import { getCookie } from '../../../utils/cookie';

export function PersonalOrders() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.getAllOrderReducer.status);
  const accessToken = getCookie('accessToken')?.replace('Bearer ', '');
  useEffect(() => {
    dispatch(wsConnection(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    return () => {
      dispatch(wcConnectionClosed(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    };
  }, [dispatch]);
  const orders = useAppSelector((store) => store.getAllOrderReducer.orders.orders);
  const handleOnClick = (order: TOrder) => {
    dispatch(addOrderFeedDetails(order));
  };
  if (isLoading === 'CONNECTING...') {
    return <p>Загрузка...</p>;
  }

  return (
    <section className={styles.personalOrdersWrapper}>
      <div className={styles.profileListWrapper}>
        <ul className={`${styles.profileList} text text_type_main-medium`}>
          <li className={styles.profileListItem}>
            <Link to={'/profile'} className={styles.profileLink}>
              Профиль
            </Link>
          </li>
          <li className={styles.profileListItem}>
            <Link to={'/profile/orders'} className={styles.profileLink}>
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
        {orders
          .map((order) => {
            return (
              <Link
                to={{ pathname: `/profile/orders/${order._id}` }}
                state={{ background: location }}
                replace={true}
                key={order._id}
                className={styles.link}
                onClick={() => handleOnClick(order)}>
                <OrderFeedDetails order={order} key={order._id} date={order.createdAt} />
              </Link>
            );
          })
          .reverse()}
      </div>
    </section>
  );
}
