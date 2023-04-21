import { Switcher } from '../Swither/Swither';
import { Ingredient } from '../Ingredient/Ingredient';
import styles from '../BurgerIngredients/styles/styles.module.css';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { TIngredient } from '../../utils/typesData';

type TItem = {
  type: string;
};

const BurgerIngredients = () => {
  const ingredients = useSelector(
    (store: any) => store.burgerIngredientReducer.burgerIngredientData,
  );
  const burgerConstructorELements = useSelector(
    (store: any) => store.burgerConstructorReducer.burgerConstructorData,
  );
  const burgerConstructorBuns = useSelector((store: any) => store.burgerConstructorReducer.buns);

  const buns = ingredients.filter((item: TItem) => item.type === 'bun');
  const sauce = ingredients.filter((item: TItem) => item.type === 'sauce');
  const mains = ingredients.filter((item: TItem) => item.type === 'main');

  let allIngredients = useMemo(() => {
    if (burgerConstructorBuns) {
      const allIngredients = [
        burgerConstructorBuns,
        ...burgerConstructorELements,
        burgerConstructorBuns,
      ];
      return allIngredients.map((obj) => obj._id);
    }
  }, []);

  console.log(allIngredients);

  function countItem(objId: string, allIngredients: Array<string> | undefined) {
    if (allIngredients) {
      return allIngredients.filter((item: string) => item === objId).length;
    } else {
      return 0;
    }
  }
  const { ref: bunRef, inView: bunsIsVisible } = useInView();
  const { ref: sauceRef, inView: sauceIsVisible } = useInView();
  const { ref: mainRef, inView: mainsIsVisible } = useInView();

  return (
    <>
      <section className={`${styles.burgerIngredients} mt-10`}>
        <h1 className={`${styles.ingredientsTitle} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>
        <nav>
          <Switcher bun={bunsIsVisible} sauce={sauceIsVisible} mains={mainsIsVisible} />
        </nav>
        <div id="ingredients" className={`${styles.ingredients} custom-scroll`}>
          <div ref={bunRef} className={styles.ingredientSection}>
            <h2 id="one" className={`${styles.ingredientTitle} mt-10 mb-6`}>
              Булки
            </h2>
            {buns.map((obj: TIngredient) => {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  count={countItem(obj._id, allIngredients)}
                />
              );
            })}
          </div>
          <div ref={sauceRef} className={styles.ingredientSection}>
            <h2 id="two" className={`${styles.ingredientTitle} mt-10 mb-6`}>
              Соусы
            </h2>
            {sauce.map((obj: TIngredient) => {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  //@ts-ignore
                  count={countItem(obj._id, allIngredients)}
                />
              );
            })}
          </div>
          <div ref={mainRef} className={styles.ingredientSection}>
            <h2 id="three" className={`${styles.ingredientTitle} mt-10 mb-6`}>
              Начинки
            </h2>
            {mains.map((obj: TIngredient) => {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  //@ts-ignore
                  count={countItem(obj._id, allIngredients)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
