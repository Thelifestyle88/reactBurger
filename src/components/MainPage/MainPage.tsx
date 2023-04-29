import AppHeader from '../AppHeader/AppHeader';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteIngredientDetails } from '../../services/actions/getIngredientDetails';
import { deleteOrderDetails } from '../../services/actions/getOrderDetails';
import styles from './styles/main.module.css';
import { useAppDispatch, useAppSelector } from '../../index';

function MainPage() {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((store) => store.ingredientDetailsReducer.ingredient);
  const order = useAppSelector((store) => store.orderDetailsReducer.orderDetails);
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      {Boolean(selectedItem) && (
        <Modal
          name="Детали ингредиента"
          onClose={() => dispatch(deleteIngredientDetails())}
          children={<IngredientDetails />}
        />
      )}
      {order && (
        <Modal
          name={order.name}
          onClose={() => {
            dispatch(deleteOrderDetails());
          }}
          //@ts-ignore
          children={<OrderDetails order={order} />}
        />
      )}
    </>
  );
}

export default MainPage;
