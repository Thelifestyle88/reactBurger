import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

export const BurgerConstructorElement = ({ obj, children, moveCard }) => {
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
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = elementIndex;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: 'SORT_ITEM',
    item: () => {
      return { elementIndex };
    },
  });
  return <div ref={drop}>{children}</div>;
};
