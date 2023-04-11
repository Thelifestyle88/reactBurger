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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from '../Registration/Registration';
import { Login } from '../Login/Login';
import { ForgottenPassword } from '../ForgottenPassword/ForgottenPassword';
import { NewPassword } from '../NewPassword/NewPassword';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Profile } from '../Profile/Profile';

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
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/password" element={<ForgottenPassword />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
