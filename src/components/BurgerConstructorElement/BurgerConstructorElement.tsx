import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { SORT_CONSTRUCTOR } from '../../services/actions/getBurgerConstructor';
import PropTypes from 'prop-types';

export const BurgerConstructorElement = ({ obj, children, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const elementIndex = useSelector((store) =>
    store.burgerConstructorReducer.burgerConstructorData.findIndex(
      (item) => item.constructorId === obj.constructorId,
    ),
  );
  const [{ handlerId }, drop] = useDrop({
    accept: 'SORT_ITEM',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.elementIndex;
      const hoverIndex = index;
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
      dispatch({
        type: SORT_CONSTRUCTOR,
        payload: {
          fromIndex: dragIndex,
          toIndex: hoverIndex,
        },
      });
      item.elementIndex = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: 'SORT_ITEM',
    item: () => {
      return { elementIndex };
    },
  });

  drag(drop(ref));

  return <div ref={ref}>{children}</div>;
};
