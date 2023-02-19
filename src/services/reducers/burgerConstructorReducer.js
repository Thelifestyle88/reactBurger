import {ADD_BUN, DELETE_POSITION, REORDER_CONSTRUCTOR, ADD_POSITION, SORT_CONSTRUCTOR} from '../actions/getBurgerConstructor'
import { nanoid } from 'nanoid';
import { sortElement } from '../service' 

const initialState = {
    buns: null,
    burgerConstructorData: [],
    count: 0
}

export function burgerConstructorReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_BUN: {
            return {
                ...state,
                buns: action.payload
            }
        }
        case ADD_POSITION: {
            const ingr = action.payload;
            ingr.constructorId = nanoid(18);
            return {
                ...state,
                burgerConstructorData: [...state.burgerConstructorData, ingr]

            }
        }
        case DELETE_POSITION: {
            return {
                ...state,
                burgerConstructorData: [...state.burgerConstructorData.slice(0, action.payload), ...state.burgerConstructorData.slice(action.payload + 1)]
            }
        }
        case REORDER_CONSTRUCTOR: {
            return {
                ...state,
                buns: action.payload,
                burgerConstructorData: action.payload
            }
        }

        case SORT_CONSTRUCTOR: {
            return {
                ...state,
                burgerConstructorData: sortElement
            }
        }
        default: {
            return state
        }
    }
}

