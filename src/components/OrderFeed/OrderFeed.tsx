import { useAppSelector } from '../../index';
import styles from './styles/orderFeed.module.css';
import { OrderFeedDetails } from '../OrderFeedDetails/OrderFeedDetails';

export function OrderFeed() {
  const ingredients = useAppSelector((store) => store.burgerIngredientReducer.burgerIngredientData);
  const maxShownIngredients = 6;
  const countOfIngredients = ingredients.length;
  const countOfHiddenIngredients = countOfIngredients - maxShownIngredients;
  console.log(ingredients);
  return (
    <>
      {ingredients.map((ingr) => {
        return <OrderFeedDetails ingredient={ingr} />;
      })}
      <h1 className={`${styles.orderHeader} mt-10`}>Лента заказов</h1>
      <section className={styles.sectionWrapper}>
        <div className={styles.orderStats}>
          <div className={styles.orderListWrapper}>
            <div className={styles.orderListsWrapper}>
              <h3 className={styles.orderListTitle}>Готовы:</h3>
              <ul className={styles.orderList}>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li>034533</li>
              </ul>
            </div>
            <div className={styles.orderListsWrapper}>
              <h3 className={styles.orderListTitle}>В работе:</h3>
              <ul className={styles.orderList}>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li className="mb-2">034533</li>
                <li>034533</li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Выполнено за всё время:</h4>
            <p>28435</p>
          </div>
          <div>
            <h4>Выполнено за сегодня:</h4>
            <p>169</p>
          </div>
        </div>
      </section>
    </>
  );
}
