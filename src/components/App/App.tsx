import { useEffect } from 'react';
import { getBurgerIngredients } from '../../services/actions/getBurgerIngredients';
import { Routes, Route, useLocation, Location, useNavigate } from 'react-router-dom';
import { Registration } from '../Pages/Registration/Registration';
import { Login } from '../Pages/Login/Login';
import { ForgottenPassword } from '../Pages/ForgottenPassword/ForgottenPassword';
import { NewPassword } from '../Pages/NewPassword/NewPassword';
import ProtectedRoute from '../Pages/ProtectedRoute/ProtectedRoute';
import { Profile } from '../Pages/Profile/Profile';
import { checkUserAuth, getInformation } from '../../services/actions/getProfile';
import IngredientPage from '../Pages/IngredientPage/IngredientPage';
import MainPage from '../Pages/MainPage/MainPage';
import Modal from '../Modal/Modal';
import { deleteIngredientDetails } from '../../services/actions/getIngredientDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useAppDispatch, useAppSelector } from '../../index';
import AppHeader from '../AppHeader/AppHeader';
import { OrderFeed } from '../OrderFeed/OrderFeed';
import { FeedId } from '../FeedId/FeedId';
import { deleteOrderFeedDetails } from '../../services/actions/getOrdersFeedDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { deleteOrderDetails } from '../../services/actions/getOrderDetails';
import { OrderPage } from '../Pages/OrderPage/OrderPage';
import { PersonalOrders } from '../Pages/PersonalOrders/PersonalOrders';
import { wsConnection } from '../../services/middleware/wsActionsType';

function App() {
  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const background = location.state && location.state.background;
  const { burgerIngredientRequest } = useAppSelector((store) => store.burgerIngredientReducer);
  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
    dispatch(getInformation());
  }, [dispatch]);
  const orderId = useAppSelector((store) => store.ordersFeedDetailsReducer.order);
  const selectedItem = useAppSelector((store) => store.ingredientDetailsReducer.ingredient);
  const order = useAppSelector((store) => store.orderDetailsReducer.orderDetails);
  if (burgerIngredientRequest) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/ordersFeed" element={<OrderFeed />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgottenPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <NewPassword />
            </ProtectedRoute>
          }
        />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="/profile/orders" element={<PersonalOrders />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<MainPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                name="Детали ингредиента"
                onClose={() => {
                  dispatch(deleteIngredientDetails());
                }}
                children={<IngredientDetails />}
              />
            }
          />
        </Routes>
      )}
      {orderId && (
        <Modal
          onClose={() => {
            dispatch(deleteOrderFeedDetails());
          }}
          //@ts-ignore
          children={<FeedId />}
        />
      )}
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

export default App;
