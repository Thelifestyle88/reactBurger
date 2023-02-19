import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

export const BurgerConstructorElement = (children) => {
  const dispatch = useDispatch();
  const ingredient = useSelector((store) => store.burgerConstructorReducer.burgerConstructorData);
  const indexPick = ingredient.indexOf(ingredient.constructorId);
  const indexDrop = ingredient.indexOf(ingredient.constructorId);
  const [, drop] = useDrop({
    accept: 'SORT_ITEM',
    item: indexPick,
    drop(indexPick, indexDrop) {
      dispatch({
        type: 'SORT_CONSTRUCTOR',
        payload: { indexPick, indexDrop },
      });
    },
  });
  const [, drag] = useDrag({
    type: 'SORT_ITEM',
    item: indexPick,
  });
  return <div>{children}</div>;
};
