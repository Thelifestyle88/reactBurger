import styles from './styles/styles.module.css';
import { useAppSelector } from '../../index';

export function IngredientDetails() {
  const ingredient = useAppSelector((store) => store.ingredientDetailsReducer.ingredient);
  return (
    ingredient && (
      <div className={styles.ingredientDetailsWrapper}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <h3 className={`${styles.ingredientTitle} mt-4 mb-8 text text_type_main-medium`}>
          {ingredient.name}
        </h3>
        <ul
          className={`${styles.ingredientDetails} text text_type_main-default text_color_inactive`}>
          <li className={styles.ingredientPoint}>
            <h4>Калории, ккал</h4>
            <p>{ingredient.calories}</p>
          </li>
          <li>
            <h4>Белки, г</h4>
            <p>{ingredient.proteins}</p>
          </li>
          <li>
            <h4>Жиры, г</h4>
            <p>{ingredient.fat}</p>
          </li>
          <li>
            <h4>Углеводы, г</h4>
            <p>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </div>
    )
  );
}
