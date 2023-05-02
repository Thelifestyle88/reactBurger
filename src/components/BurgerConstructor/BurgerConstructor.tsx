import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from '../BurgerConstructor/styles/burgerConstructor.module.css';
import { DELETE_POSITION } from '../../services/actions/getBurgerConstructor';
import { getOrderDetails } from '../../services/actions/getOrderDetails';
import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import { addPosition } from '../../services/actions/getBurgerConstructor';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/typesData';
import { useAppDispatch, useAppSelector } from '../../index';

const BurgerConstructor = () => {
  const isAuth = useAppSelector((store) => store.authorizationReducer.isAithorizationSucceed);
  const ingredient = useAppSelector(
    (store) => store.burgerConstructorReducer.burgerConstructorData,
  );
  const navigate = useNavigate();
  const bun = useAppSelector((store) => store.burgerConstructorReducer.buns);
  const dispatch = useAppDispatch();
  const isIngredientExist = ingredient.length > 0;
  const price = useMemo(() => {
    if (bun) {
      const allPrice = [bun, ...ingredient, bun];
      return allPrice
        .map((obj) => obj.price)
        .reduce((acc, curr) => {
          return (acc = acc + curr);
        }, 0);
    } else {
      return 0;
    }
  }, [bun, ingredient]);

  const [, drop] = useDrop({
    accept: 'NEW_INGREDIENT',
    drop(setElement: TIngredient) {
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
          {ingredient.map((obj, index: number) => {
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
            if (isAuth) {
              const orderCreate = [bun, ...ingredient, bun];
              if (orderCreate) {
                const orderId: Array<string | undefined> = orderCreate.map(
                  (ingredient) => ingredient?._id,
                );
                dispatch(getOrderDetails(orderId));
              } else {
                return alert('Add positions!');
              }
            } else {
              navigate('/login');
            }
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
