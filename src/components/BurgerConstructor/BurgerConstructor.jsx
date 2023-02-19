import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from '../BurgerConstructor/styles/burgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_POSITION } from '../../services/actions/getBurgerConstructor';
import { getOrderDetails } from '../../services/actions/getOrderDetails';
import { SORT_CONSTRUCTOR } from '../../services/actions/getBurgerConstructor';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import { addPosition, reorderConstructor } from '../../services/actions/getBurgerConstructor';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';

function BurgerConstructor(setElement) {
  const ingredient = useSelector((store) => store.burgerConstructorReducer.burgerConstructorData);
  const bun = useSelector((store) => store.burgerConstructorReducer.buns);
  const dispatch = useDispatch();
  const isIngredientExist = ingredient.length > 0;
  let price = 0;
  price = useMemo(() => {
    if (bun) {
      const allPrice = [bun, ...ingredient, bun];
      return allPrice
        .map((obj) => obj.price)
        .reduce((acc, curr) => {
          return (acc = acc + curr);
        }, 0);
    }
  });

  const [, drop] = useDrop({
    accept: 'NEW_INGREDIENT',
    item: setElement,
    drop(setElement) {
      dispatch(addPosition(setElement));
    },
  });

  return (
    <section className={`${burgerConstructor.burgerConstructor} mt-25`} ref={drop}>
      {bun && (
        <div className={`${burgerConstructor.bun} ml-6`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {isIngredientExist && (
        <div className={burgerConstructor.mainCourses}>
          {ingredient.map((obj, index) => {
            return (
              <BurgerConstructorElement
                moveCard={dispatch({
                  type: SORT_CONSTRUCTOR,
                  payload: index,
                })}
                key={obj.constructorId}
                obj={obj}>
                <div>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    handleClose={() => {
                      dispatch({
                        type: DELETE_POSITION,
                        payload: index,
                      });
                    }}
                    thumbnail={obj.image}
                    text={obj.name}
                    price={obj.price}
                  />
                </div>
              </BurgerConstructorElement>
            );
          })}
        </div>
      )}
      {bun && (
        <div className={`${burgerConstructor.bun} ml-6`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${burgerConstructor.finishOrder} text text_type_main-large mr-25`}>
        <p>{price}</p>
        <CurrencyIcon className={burgerConstructor.icon} type="primary" />
        <Button
          onClick={() => {
            const orderCreate = [bun, ...ingredient, bun];
            const orderId = orderCreate.map((ingredient) => ingredient._id);
            dispatch(getOrderDetails(orderId), reorderConstructor());
          }}
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
