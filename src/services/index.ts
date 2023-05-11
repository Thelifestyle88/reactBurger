import { burgerIngredientReducer } from './reducers/burgerIngredientsReducer';
import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burgerConstructorReducer';
import { ingredientDetailsReducer } from './reducers/ingredientDetailsReducer';
import { orderDetailsReducer } from './reducers/orderDetailsReducer';
import { authorizationReducer } from './reducers/authorizationReducer';
import { profileInformationReducer } from './reducers/profileInformationReducer';
import { getAllOrderReducer } from './reducers/getAllOrdersReducer';
import { ordersFeedDetailsReducer } from './reducers/ordersFeedDetailsReducer';

export const rootReducer = combineReducers({
  burgerIngredientReducer,
  burgerConstructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
  authorizationReducer,
  profileInformationReducer,
  getAllOrderReducer,
  ordersFeedDetailsReducer
});

