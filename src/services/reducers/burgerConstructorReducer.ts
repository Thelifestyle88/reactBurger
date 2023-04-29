import { act } from '@testing-library/react';
import { TIngredient } from '../../utils/typesData';
import {
  ADD_BUN,
  DELETE_POSITION,
  ADD_POSITION,
} from '../actions/getBurgerConstructor';
import { PayloadAction } from '@reduxjs/toolkit'

interface IBurgerConstructorState {
  buns: TIngredient | null,
  burgerConstructorData: Array<TIngredient>,
  count: number
}


const initialState: IBurgerConstructorState = {
  buns: null,
  burgerConstructorData: [],
  count: 0,
};

export function burgerConstructorReducer(state = initialState, action: PayloadAction<TIngredient>): IBurgerConstructorState {
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
        burgerConstructorData: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
