import { Switcher } from '../Swither/Swither';
import { MakeIngredient } from '../MakeIngredient/MakeIngredient';
import styles from '../BurgerIngredients/styles/styles.module.css';

function BurgerIngredients({ ingredients, setElement }) {
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  return (
    <>
      <section className={styles.burgerIngredients}>
        <h1 className={`${styles.ingredientsTitle} text text_type_main-large mt-10 pb-5`}>
          Соберите бургер
        </h1>
        <nav>
          <Switcher />
        </nav>
        <div className={styles.ingredients}>
          <h2 className={`${styles.ingredientTitle} mt-10 mb-6`}>Булки</h2>
          {buns.map((obj) => {
            return <MakeIngredient clickHandler={setElement} key={obj._id} ingredient={obj} />;
          })}
          <h2 className={`${styles.ingredientTitle} mt-10 mb-6`}>Соусы</h2>
          {sauce.map((obj) => {
            return <MakeIngredient clickHandler={setElement} key={obj._id} ingredient={obj} />;
          })}
          <h2 className={`${styles.ingredientTitle} mt-10 mb-6`}>Начинки</h2>
          {mains.map((obj) => {
            return <MakeIngredient clickHandler={setElement} key={obj._id} ingredient={obj} />;
          })}
        </div>
      </section>
    </>
  );
}

export default BurgerIngredients;
