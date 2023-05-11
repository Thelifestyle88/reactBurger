import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from '../AppHeader/styles/appHeader.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../..';
import { wsConnection, wcConnectionClosed } from '../../services/middleware/wsActionsType';

function AppHeader() {
  const dispatch = useAppDispatch();
  const connect = (wsUrl: string) => dispatch(wsConnection(wsUrl));
  const disconnect = (wsUrl: string) => dispatch(wcConnectionClosed(wsUrl));
  return (
    <header className={`${appHeader.headerWrap} mt-8`}>
      <div className={appHeader.header}>
        <div className={appHeader.orders}>
          <Link to="/">
            <button
              className={`${appHeader.button} pt-4 pb-4 mt-2 mb-2 text text_type_main-default`}>
              <BurgerIcon type="primary" />
              Конструктор
            </button>
          </Link>
          <Link to="/ordersFeed">
            <button
              onClick={() => connect('wss://norma.nomoreparties.space/orders/all')}
              className={`${appHeader.button} pt-4 pb-4 mt-2 mb-2 text text_type_main-default`}>
              <ListIcon type="primary" />
              Лента заказов
            </button>
          </Link>
        </div>
        <Logo />
        <Link to="/profile">
          <button
            onClick={() => disconnect('wss://norma.nomoreparties.space/orders/all')}
            className={`${appHeader.button} pt-4 pr-5 pb-4 pl-5 mt-2 mb-2 text text_type_main-default`}>
            <ProfileIcon type="primary" />
            Личный кабинет
          </button>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
