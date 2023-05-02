import { useAppSelector } from '../..';
import styles from './styles/orderFeedDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderFeedDetails({ ingredient }) {
  const maxShownIngredients = 6;
  const countOfIngredients = ingredient.length;
  return (
    <>
      <div className={styles.ordersWrapper}>
        <div className={`${styles.time} m-6`}>
          <p>#1235352</p>
          <p>время</p>
        </div>
        <h2 className="m-6">DeathStar Burger</h2>
        <div className={`${styles.orderWrapper} m-6`}>
          <div className={styles.imageWrapper}>
            {ingredient
              .map((item) => {
                return (
                  <div className={styles.imageContainer}>
                    <img className={styles.image} src={item.image_mobile} alt={item.name} />
                  </div>
                );
              })
              .slice(0, maxShownIngredients)}
          </div>
          <div className={styles.priceWrapper}>
            <p>540</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}
