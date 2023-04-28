import { TIngredient } from '../../utils/typesData';
import {
  ADD_BUN,
  DELETE_POSITION,
  ADD_POSITION,
  SORT_CONSTRUCTOR,
} from '../actions/getBurgerConstructor';
import { PayloadAction } from '@reduxjs/toolkit'

interface IBurgerConstructorState {
  buns: TIngredient | null,
  burgerConstructorData: TIngredient[],
  count: number
}


const initialState: IBurgerConstructorState = {
  buns: null,
  burgerConstructorData: [],
  count: 0,
};

export function burgerConstructorReducer(state = initialState, action: PayloadAction<number>) {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        buns: action.payload,
      };
    }
    case ADD_POSITION: {
      return {
        ...state,
        burgerConstructorData: [...state.burgerConstructorData, action.payload],
      };
    }
    case DELETE_POSITION: {
      return {
        ...state,
        burgerConstructorData: [
          ...state.burgerConstructorData.slice(0, action.payload),
          ...state.burgerConstructorData.slice(action.payload + 1),
        ],
      };
    }
    default: {
      return state;
    }
  }
}
