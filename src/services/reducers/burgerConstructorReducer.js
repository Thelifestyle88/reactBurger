import {
  ADD_BUN,
  DELETE_POSITION,
  REORDER_CONSTRUCTOR,
  ADD_POSITION,
  SORT_CONSTRUCTOR,
} from '../actions/getBurgerConstructor';

const initialState = {
  buns: null,
  burgerConstructorData: [],
  count: 0,
};

export function burgerConstructorReducer(state = initialState, action) {
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

    case SORT_CONSTRUCTOR: {
      console.log(`{${action.payload.fromIndex}, ${action.payload.toIndex}}`);
      const arr = [...state.burgerConstructorData];
      arr.splice(
        action.payload.toIndex,
        1,
        ...arr.splice(action.payload.fromIndex, 1, arr[action.payload.toIndex]),
      );
      return {
        ...state,
        burgerConstructorData: arr,
      };
    }
    default: {
      return state;
    }
  }
}
