import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/getBurgerIngredients';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Registration } from '../Registration/Registration';
import { Login } from '../Login/Login';
import { ForgottenPassword } from '../ForgottenPassword/ForgottenPassword';
import { NewPassword } from '../NewPassword/NewPassword';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Profile } from '../Profile/Profile';
import { checkUserAuth, getInformation } from '../../services/actions/getProfile';
import IngredientPage from '../IngredientPage/IngredientPage';
import MainPage from '../MainPage/MainPage';
import Modal from '../Modal/Modal';
import { deleteIngredientDetails } from '../../services/actions/getIngredientDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  console.log(location);
  console.log(background);
  const { burgerIngredientRequest } = useSelector((store) => store.burgerIngredientReducer);
  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
    dispatch(getInformation());
  }, []);

  if (burgerIngredientRequest) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <Routes location={background || location}>
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
            path="/ingredients/:idIngredient"
            element={
              <Modal
                name="Детали ингредиента"
                onClose={() => dispatch(deleteIngredientDetails())}
                children={<IngredientDetails />}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
