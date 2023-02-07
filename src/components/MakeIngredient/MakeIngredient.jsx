import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../MakeIngredient/styles/styles.module.css';

export function MakeIngredient({ clickHandler, ingredient }) {
  return (
    <div
      onClick={() => clickHandler(ingredient)}
      className={`${styles.ingredient} mt-6 text text_type_main-default`}>
      <Counter className={styles.counter} count={1} size="default" extraClass="m-1" />
      <img className="mr-4 ml-4 mb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.ingredientPriceWrap} mb-1`}>
        <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.description}>{ingredient.name}</p>
    </div>
  );
}
