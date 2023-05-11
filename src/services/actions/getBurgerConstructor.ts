import { nanoid } from 'nanoid';
import { TIngredient } from '../../utils/typesData';

export const ADD_POSITION: 'ADD_POSITION' = 'ADD_POSITION';
export const DELETE_POSITION: 'DELETE_POSITION' = 'DELETE_POSITION';
export const REORDER_CONSTRUCTOR: 'REORDER_CONSTRUCTOR' = 'REORDER_CONSTRUCTOR';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const SORT_CONSTRUCTOR: 'SORT_CONSTRUCTOR' = 'SORT_CONSTRUCTOR';

export interface IAddPosition {
  readonly type: typeof ADD_POSITION;
  payload: TIngredient;
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  payload: TIngredient;
}

interface IPaayloadSort {
  toIndex: number;
  fromIndex: number
}

export interface ISortConstructor {
 readonly type: typeof SORT_CONSTRUCTOR;
 payload : IPaayloadSort
}

export interface IDeletePosition {
  readonly type: typeof DELETE_POSITION;
  payload: number
}

export type TBurgerActions = | IAddPosition | IAddBun | ISortConstructor | IDeletePosition

export const addPosition = (ingredient: TIngredient) => {
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

export const sortConstructor = (fromIndex:number, toIndex: number) => {
  return {
    type: SORT_CONSTRUCTOR,
    payload: {
      fromIndex: fromIndex,
      toIndex: toIndex,
    },
  };
};