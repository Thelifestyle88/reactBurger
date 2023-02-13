import React from 'react';
import styles from './styles/styles.module.css';

export function IngredientDetails(ingredient) {
  return (
    <div className={styles.ingredientDetailsWrapper}>
      <img src={ingredient.ingredient.image_large} alt={ingredient.ingredient.name} />
      <h3 className={`${styles.ingredientTitle} mt-4 mb-8 text text_type_main-medium`}>
        {ingredient.ingredient.name}
      </h3>
      <ul className={`${styles.ingredientDetails} text text_type_main-default text_color_inactive`}>
        <li className={styles.ingredientPoint}>
          <h4>Калории, ккал</h4>
          <p>{ingredient.ingredient.calories}</p>
        </li>
        <li>
          <h4>Белки, г</h4>
          <p>{ingredient.ingredient.proteins}</p>
        </li>
        <li>
          <h4>Жиры, г</h4>
          <p>{ingredient.ingredient.fat}</p>
        </li>
        <li>
          <h4>Углеводы, г</h4>
          <p>{ingredient.ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}
