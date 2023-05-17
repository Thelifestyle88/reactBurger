import { TIngredient } from '../../utils/typesData';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/getIngredientDetails';
import { PayloadAction } from '@reduxjs/toolkit'

interface IIngredientDetailsState {
  ingredient: TIngredient | null
}

export const initialState: IIngredientDetailsState = {
  ingredient: null,
};

export function ingredientDetailsReducer(state = initialState, action: PayloadAction<TIngredient>) {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ingredient: action.payload,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ingredient: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
