import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/getIngredientDetails';

const initialState = {
  ingredient: null,
};

export function ingredientDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
