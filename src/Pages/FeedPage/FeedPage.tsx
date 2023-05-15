import { OrderPage } from '../OrderPage/OrderPage';
import { wcConnectionClosed, wsConnection } from '../../services/middleware/wsActionsType';
import { useEffect } from 'react';
import { useAppDispatch } from '../..';

export function FeedPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsConnection(`wss://norma.nomoreparties.space/orders/all`));
    return () => {
      dispatch(wcConnectionClosed(`wss://norma.nomoreparties.space/orders/all`));
    };
  }, [dispatch]);
  return (
    <>
      <OrderPage />
    </>
  );
}
