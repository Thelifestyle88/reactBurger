import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { ReactNode, useRef } from 'react';
import { SORT_CONSTRUCTOR } from '../../services/actions/getBurgerConstructor';
import { useAppDispatch, useAppSelector } from '../../index';
import { TIngredient } from '../../utils/typesData';

interface TBurgerConstructorElementProps {
  obj: TIngredient;
  children: ReactNode;
  index: number;
}

export const BurgerConstructorElement = ({
  obj,
  children,
  index,
}: TBurgerConstructorElementProps) => {
  const dispatch = useAppDispatch();
  const ref: React.MutableRefObject<any> = useRef(null);
  const elementIndex = useAppSelector((store) =>
    //@ts-ignore
    store.burgerConstructorReducer.burgerConstructorData.findIndex(
      //@ts-ignore
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
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.elementIndex;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      //@ts-ignore
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
