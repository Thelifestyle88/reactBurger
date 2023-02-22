import { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/getBurgerIngredients';
import { deleteIngredientDetails } from '../../services/actions/getIngredientDetails';
import { deleteOrderDetails } from '../../services/actions/getOrderDetails';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles/app.module.css';

function App() {
  const { burgerIngredientRequest } = useSelector((store) => store.burgerIngredientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);
  const selectedItem = useSelector((store) => store.ingredientDetailsReducer.ingredient);

  const order = useSelector((store) => store.orderDetailsReducer.orderDetails);

  if (burgerIngredientRequest) {
    return <p>Загрузка</p>;
  }

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
          children={<IngredientDetails ingredient={selectedItem} />}
        />
      )}
      {Boolean(order) && (
        <Modal
          name={order.name}
          onClose={() => {
            dispatch(deleteOrderDetails());
          }}
          children={<OrderDetails order={order} />}
        />
      )}
    </>
  );
}

export default App;
