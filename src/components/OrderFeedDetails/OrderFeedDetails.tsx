import { useAppSelector } from '../..';
import { TOrder } from '../../utils/typesData';
import styles from './styles/orderFeedDetails.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderFeedDetailsProps {
  order: TOrder;
  date: string;
}

export function OrderFeedDetails({ order, date }: OrderFeedDetailsProps) {
  const ingredients = useAppSelector((store) => store.burgerIngredientReducer.burgerIngredientData);
  const ingredientsInOrder = order.ingredients;
  const maxShownIngredients = 6;
  const countOfIngredients = ingredientsInOrder.length;
  const elements = ingredientsInOrder.map((item) => {
    return ingredients.find((el) => {
      return el._id === item;
    });
  });
  const prices = elements.map((item) => {
    return item?.price;
  });
  const price = prices.reduce((acc, item) => {
    //@ts-ignore
    return (acc = acc + item);
  });

  return (
    <div className={styles.ordersWrapper}>
      <div className={`${styles.time} m-6`}>
        <p className={styles.orderNumber}>{`#${order.number}`}</p>
        <FormattedDate date={new Date(date)} />
      </div>
      <h2 className="m-6">{order.name}</h2>
      <div className={`${styles.orderWrapper} m-6`}>
        <div className={styles.imageWrapper}>
          {elements
            .map((item, index) => {
              return (
                <div key={index.toString()} className={styles.imageContainer}>
                  <img className={styles.image} src={item?.image_mobile} alt={item?.name} />
                </div>
              );
            })
            .slice(0, maxShownIngredients)}
        </div>
        <div className={styles.priceWrapper}>
          <p>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
