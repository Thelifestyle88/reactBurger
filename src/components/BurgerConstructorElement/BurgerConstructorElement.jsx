import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

export const BurgerConstructorElement = ({ obj, children }) => {
  const dispatch = useDispatch();
  const elementIndex = useSelector((store) =>
    store.burgerConstructorReducer.burgerConstructorData.findIndex(
      (item) => item.constructorId === obj.constructorId,
    ),
  );
  const [, drop] = useDrop({
    accept: 'SORT_ITEM',
    item: elementIndex,
    drop(elementIndex, indexDrop) {
      dispatch({
        type: 'SORT_CONSTRUCTOR',
        payload: { elementIndex, indexDrop },
      });
    },
  });
  const [, drag] = useDrag({
    type: 'SORT_ITEM',
    item: elementIndex,
  });
  return <div>{children}</div>;
};
