import {
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCEED,
} from '../actions/getBurgerIngredients';

const initialState = {
  burgerIngredientData: [],
  burgerIngredientRequest: false,
  burgerIngredientFailed: false,
  isPageOnLoad: false,
};

export function burgerIngredientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngredientRequest: true,
        isPageOnLoad: true,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCEED: {
      return {
        ...state,
        burgerIngredientData: action.burgerIngredientData,
        burgerIngredientRequest: false,
        burgerIngredientFailed: false,
        isPageOnLoad: false,
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredientRequest: false,
        burgerIngredientFailed: true,
        isPageOnLoad: false,
      };
    }
    default: {
      return state;
    }
  }
}
