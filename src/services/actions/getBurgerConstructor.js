import { nanoid } from 'nanoid';

export const ADD_POSITION = 'ADD_POSITION';
export const DELETE_POSITION = 'DELETE_POSITION';
export const REORDER_CONSTRUCTOR = 'REORDER_CONSTRUCTOR';
export const ADD_BUN = 'ADD_BUN';
export const SORT_CONSTRUCTOR = 'SORT_CONSTRUCTOR';

export const addPosition = (ingredient) => {
  if (ingredient.type !== 'bun') {
    return {
      type: ADD_POSITION,
      payload: {
        ...ingredient,
        constructorId: nanoid(18),
      },
    };
  } else {
    return {
      type: ADD_BUN,
      payload: {
        ...ingredient,
        id: ingredient._id,
      },
    };
  }
};

export const reorderConstructor = () => {
  return {
    type: REORDER_CONSTRUCTOR,
    payload: {
      buns: null,
      burgerConstructorData: [],
    },
  };
};

export const sortConstructor = (ingredientPicked, ingredientDrop) => {
  return {
    type: SORT_CONSTRUCTOR,
    payload: {
      indexPick: ingredientPicked,
      indexDrop: ingredientDrop,
    },
  };
};
