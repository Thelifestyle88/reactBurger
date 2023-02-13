import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from '../BurgerConstructor/styles/burgerConstructor.module.css';

function BurgerConstructor({ ingredients, order }) {
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');
  const isBunsExists = buns.length > 0;
  return (
    <section className={`${burgerConstructor.burgerConstructor} mt-25`}>
      {isBunsExists && (
        <ConstructorElement
          extraClass="ml-6"
          type="top"
          isLocked={true}
          text={`${buns[0].name} (верх)`}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />
      )}
      <div className={burgerConstructor.mainCourses}>
        {mains.map((obj) => {
          return (
            <div key={obj._id}>
              <DragIcon type="primary" />
              <ConstructorElement thumbnail={obj.image} text={obj.name} price={obj.price} />
            </div>
          );
        })}
      </div>
      {isBunsExists && (
        <ConstructorElement
          extraClass="ml-6"
          type="bottom"
          isLocked={true}
          text={`${buns[0].name} (низ)`}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />
      )}
      <div className={`${burgerConstructor.finishOrder} text text_type_main-large mr-25`}>
        <p>210</p>
        <CurrencyIcon className={burgerConstructor.icon} type="primary" />
        <Button onClick={order} extraClass="ml-10" htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
