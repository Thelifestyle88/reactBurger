import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from '../AppHeader/styles/appHeader.module.css';

function AppHeader() {
  return (
    <header className={`${appHeader.headerWrap} mt-8`}>
      <div className={appHeader.header}>
        <div className={appHeader.orders}>
          <button className={`${appHeader.button} pt-4 pb-4 mt-2 mb-2 text text_type_main-default`}>
            <BurgerIcon type="primary" />
            Конструктор
          </button>
          <button className={`${appHeader.button} pt-4 pb-4 mt-2 mb-2 text text_type_main-default`}>
            <ListIcon type="primary" />
            Лента заказов
          </button>
        </div>
        <Logo />
        <button
          className={`${appHeader.button} pt-4 pr-5 pb-4 pl-5 mt-2 mb-2 text text_type_main-default`}>
          <ProfileIcon type="primary" />
          Личный кабинет
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
