import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from '../BurgerConstructor/styles/burgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_POSITION } from '../../services/actions/getBurgerConstructor';
import { getOrderDetails } from '../../services/actions/getOrderDetails';
import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import { addPosition } from '../../services/actions/getBurgerConstructor';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';

const BurgerConstructor: FC = () => {
  const ingredient = useSelector(
    (store: any) => store.burgerConstructorReducer.burgerConstructorData,
  );
  const bun = useSelector((store: any) => store.burgerConstructorReducer.buns);
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
  }, []); //Добавил пустой массив

  const [, drop] = useDrop({
    accept: 'NEW_INGREDIENT',
    drop(setElement) {
      dispatch(addPosition(setElement));
    },
  });

  return (
    <section className={`${burgerConstructor.burgerConstructor} custom-scroll mt-25`} ref={drop}>
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
          {ingredient.map((obj: string | any, index: number) => {
            return (
              <BurgerConstructorElement index={index} key={obj.constructorId} obj={obj}>
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
        <CurrencyIcon type="primary" />
        <Button
          onClick={() => {
            const orderCreate = [bun, ...ingredient, bun];
            const orderId = orderCreate.map((ingredient) => ingredient._id);
            //@ts-ignore
            dispatch(getOrderDetails(orderId));
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
};
export default BurgerConstructor;
