import { FeedId } from '../FeedId/FeedId';
import { wcConnectionClosed, wsConnection } from '../../services/middleware/wsActionsType';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { useAppDispatch } from '../..';

export function FeedDetails() {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken')?.replace('Bearer ', '');
  useEffect(() => {
    dispatch(wsConnection(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    return () => {
      dispatch(wcConnectionClosed(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    };
  }, [dispatch]);
  return (
    <>
      <FeedId />
    </>
  );
}
