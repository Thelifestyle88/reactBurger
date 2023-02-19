import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

export const BurgerConstructorElement = ({ obj, children }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const elementIndex = useSelector((store) =>
    store.burgerConstructorReducer.burgerConstructorData.findIndex(
      (item) => item.constructorId === obj.constructorId,
    ),
  );
  const [{ handlerId }, drop] = useDrop({
    accept: 'SORT_ITEM',
    item: elementIndex,
    drop(elementIndex, indexDrop) {
      dispatch({
        type: 'SORT_CONSTRUCTOR',
        payload: { elementIndex, indexDrop },
      });
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHeandlerId(),
      };
    },
  });
  const [, drag] = useDrag({
    type: 'SORT_ITEM',
    item: elementIndex,
  });
  return <div ref={drop}>{children}</div>;
};
