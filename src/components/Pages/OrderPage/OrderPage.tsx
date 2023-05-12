import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../..';
import styles from '../../FeedId/styles/feedId.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderPage() {
  const ingredients = useAppSelector((store) => store.burgerIngredientReducer.burgerIngredientData);
  const orderId = useParams();
  console.log(orderId);
  const orders = useAppSelector((store) => store.getAllOrderReducer.orders.orders);
  const order = orders.find((item) => item._id === String(orderId.id));
  //@ts-ignore
  const date: string = order?.createdAt;
  console.log(orders);
  const ingredientsInOrder = order?.ingredients;
  const elements = ingredientsInOrder?.map((item) => {
    return ingredients.find((el) => {
      return el._id === item;
    });
  });

  const prices = elements?.map((item) => {
    return item?.price;
  });
  const price = prices?.reduce((acc, item) => {
    //@ts-ignore
    return (acc = acc + item);
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.feedIdWrapper} m-6`}>
        <h1 className={styles.feedIdNumber}>#{order?.number}</h1>
        <h2>{order?.name}</h2>
        <p>{order?.status === 'done' ? 'Выполнен' : 'В работе'}</p>
        <h3>Состав:</h3>
        <ul className={`${styles.feedIdList} custom-scroll`}>
          {elements?.map((item) => {
            return (
              <li className={styles.feedIdItem}>
                <div className={styles.feedIdName}>
                  <img src={item?.image_mobile} alt={item?.name} />
                  <p>{item?.name}</p>
                </div>
                <div className={styles.feedIdPrice}>
                  <p>{item?.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.feedIdPriceOverall}>
          <FormattedDate date={new Date(date)} />
          <div className={styles.feedIdPrice}>
            <p>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
