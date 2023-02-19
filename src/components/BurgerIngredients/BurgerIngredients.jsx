import { Switcher } from '../Swither/Swither';
import { MakeIngredient } from '../MakeIngredient/MakeIngredient';
import styles from '../BurgerIngredients/styles/styles.module.css';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.burgerIngredientReducer.burgerIngredientData);
  const burgerConstructorELements = useSelector(
    (store) => store.burgerConstructorReducer.burgerConstructorData,
  );
  const burgerConstructorBuns = useSelector((store) => store.burgerConstructorReducer.buns);

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  let allIngredients;
  allIngredients = useMemo(() => {
    if (burgerConstructorBuns) {
      const allIngredients = [
        burgerConstructorBuns,
        ...burgerConstructorELements,
        burgerConstructorBuns,
      ];
      return allIngredients.map((obj) => obj._id);
    }
  });

  function countItem(objId, allIngredients) {
    if (allIngredients) {
      return allIngredients.filter((item) => item === objId).length;
    } else {
      return 0;
    }
  }

  return (
    <>
      <section className={`${styles.burgerIngredients} mt-10`}>
        <h1 className={`${styles.ingredientsTitle} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>
        <nav>
          <Switcher />
        </nav>
        <div id="ingredients" className={styles.ingredients}>
          <h2 id="one" className={`${styles.ingredientTitle} mt-10 mb-6`}>
            Булки
          </h2>
          {buns.map((obj) => {
            return (
              <MakeIngredient
                key={obj._id}
                ingredient={obj}
                count={countItem(obj._id, allIngredients)}
              />
            );
          })}
          <h2 id="two" className={`${styles.ingredientTitle} mt-10 mb-6`}>
            Соусы
          </h2>
          {sauce.map((obj) => {
            return (
              <MakeIngredient
                key={obj._id}
                ingredient={obj}
                count={countItem(obj._id, allIngredients)}
              />
            );
          })}
          <h2 id="three" className={`${styles.ingredientTitle} mt-10 mb-6`}>
            Начинки
          </h2>
          {mains.map((obj) => {
            return (
              <MakeIngredient
                key={obj._id}
                ingredient={obj}
                count={countItem(obj._id, allIngredients)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default BurgerIngredients;
