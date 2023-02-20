import { burgerIngredientReducer } from './reducers/burgerIngredientsReducer';
import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burgerConstructorReducer';
import { ingredientDetailsReducer } from './reducers/ingredientDetailsReducer';
import { orderDetailsReducer } from './reducers/orderDetailsReducer';

export const rootReducer = combineReducers({
  burgerIngredientReducer,
  burgerConstructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
});
