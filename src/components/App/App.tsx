import { useEffect } from 'react';
import { getBurgerIngredients } from '../../services/actions/getBurgerIngredients';
import { Routes, Route, useLocation, Location, useNavigate } from 'react-router-dom';
import { Registration } from '../../Pages/Registration/Registration';
import { Login } from '../../Pages/Login/Login';
import { ForgottenPassword } from '../../Pages/ForgottenPassword/ForgottenPassword';
import { NewPassword } from '../../Pages/NewPassword/NewPassword';
import ProtectedRoute from '../../Pages/ProtectedRoute/ProtectedRoute';
import { Profile } from '../../Pages/Profile/Profile';
import { checkUserAuth, getInformation } from '../../services/actions/getProfile';
import IngredientPage from '../../Pages/IngredientPage/IngredientPage';
import MainPage from '../../Pages/MainPage/MainPage';
import Modal from '../Modal/Modal';
import { deleteIngredientDetails } from '../../services/actions/getIngredientDetails';
import { useAppDispatch, useAppSelector } from '../../index';
import AppHeader from '../AppHeader/AppHeader';
import { OrderFeed } from '../../Pages/OrderFeed/OrderFeed';
import { FeedId } from '../../Pages/FeedId/FeedId';
import { deleteOrderFeedDetails } from '../../services/actions/getOrdersFeedDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { deleteOrderDetails } from '../../services/actions/getOrderDetails';
import { OrderPage } from '../../Pages/OrderPage/OrderPage';
import { PersonalOrders } from '../../Pages/PersonalOrders/PersonalOrders';
import { wsConnection } from '../../services/middleware/wsActionsType';
import { getCookie } from '../../utils/cookie';
import { FeedDetails } from '../../Pages/FeedDetails/FeedDetails';
import { FeedPage } from '../../Pages/FeedPage/FeedPage';

function App() {
  const accessToken = getCookie('accessToken')?.replace('Bearer ', '');
  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const { burgerIngredientRequest } = useAppSelector((store) => store.burgerIngredientReducer);
  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
    dispatch(getInformation());
  }, [dispatch]);
  const order = useAppSelector((store) => store.orderDetailsReducer.orderDetails);
  const closeIngredientModal = () => {
    dispatch(deleteIngredientDetails());
    navigate(background.pathname || '/', { replace: true });
  };
  const closeOrderPage = () => {
    navigate(background.pathname || '/feed', { replace: true });
    dispatch(deleteOrderFeedDetails());
  };

  const closePersonalOrderPage = () => {
    navigate(background.pathname || '/profile/orders', { replace: true });
    dispatch(deleteOrderFeedDetails());
  };

  if (burgerIngredientRequest) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/feed" element={<OrderFeed />} />
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
        <Route path="/feed/:id" element={<FeedPage />} />
        <Route path="/profile/orders/:id" element={<FeedDetails />} />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <PersonalOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<MainPage />} />
      </Routes>
      {background?.pathname === '/' && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                name="Детали ингредиента"
                onClose={() => {
                  closeIngredientModal();
                }}
                children={<IngredientPage />}
              />
            }
          />
        </Routes>
      )}
      {background?.pathname === '/feed' && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal
                onClose={() => {
                  closeOrderPage();
                }}
                children={<OrderPage />}
              />
            }
          />
        </Routes>
      )}
      {background?.pathname === '/profile/orders' && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal
                onClose={() => {
                  closePersonalOrderPage();
                }}
                children={<FeedId />}
              />
            }
          />
        </Routes>
      )}
      {order && (
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
