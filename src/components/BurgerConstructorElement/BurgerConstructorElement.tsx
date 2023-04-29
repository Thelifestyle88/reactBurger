import { useDrop, useDrag, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { FC, ReactNode, useRef } from 'react';
import { SORT_CONSTRUCTOR } from '../../services/actions/getBurgerConstructor';
import { useAppDispatch, useAppSelector } from '../../index';

interface TBurgerConstructorElementProps {
  obj: TObj;
  children: ReactNode;
  index: number;
}

type TObj = {
  constructorId: number;
};

export const BurgerConstructorElement = ({
  obj,
  children,
  index,
}: TBurgerConstructorElementProps) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const elementIndex = useAppSelector((store) =>
    //@ts-ignore
    store.burgerConstructorReducer.burgerConstructorData.findIndex(
      (item: any) => item.constructorId === obj.constructorId,
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
      //@ts-ignore
      const dragIndex: number = item.elementIndex;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      //@ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
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
      //@ts-ignore
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
