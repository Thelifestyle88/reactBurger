import { useState } from 'react';
import styles from './styles/profile.module.css';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeProfile } from '../../../services/actions/getProfile';
import { Link } from 'react-router-dom';
import { logOutProfile } from '../../../services/actions/logInOutProfile';
import { useAppDispatch, useAppSelector } from '../../..';
import { wsConnection, wcConnectionClosed } from '../../../services/middleware/wsActionsType';

export function Profile() {
  const dispatch = useAppDispatch();
  const connect = (wsUrl: string) => dispatch(wsConnection(wsUrl));
  const disconnect = (wsUrl: string) => dispatch(wcConnectionClosed(wsUrl));
  const profileInformationRequest = useAppSelector(
    (store) => store.profileInformationReducer.profileInformationRequest,
  );
  const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
  console.log(accessToken);
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const changeName = (e: React.FocusEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const changeEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (profileInformationRequest) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <div className={styles.profileWrapper}>
        <div className={styles.profileListWrapper}>
          <ul className={`${styles.profileList} text text_type_main-medium`}>
            <li className={styles.profileListItem}>
              <Link to={'/profile'} className={styles.profileLink}>
                Профиль
              </Link>
            </li>
            <li className={styles.profileListItem}>
              <Link
                to={'/profile/orders'}
                onClick={() => {
                  disconnect('wss://norma.nomoreparties.space/orders/all');
                  connect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
                }}
                className={styles.profileLink}>
                История заказов
              </Link>
            </li>
            <li className={styles.profileListItem}>
              <Link
                to={'/'}
                onClick={() => {
                  dispatch(logOutProfile());
                }}
                className={styles.profileLink}>
                Выход
              </Link>
            </li>
          </ul>
          <p
            className={`${styles.profileText} text text_type_main-default text_color_inactive mt-20`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.profileInputWrapper}>
          <Input
            onChange={changeName}
            value={name}
            icon={'EditIcon'}
            name={'email'}
            placeholder="Имя"
            extraClass="mb-2"
          />
          <EmailInput
            onChange={changeEmail}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />
          <Input
            onChange={(e) => {
              e.preventDefault();
            }}
            value={'12345'}
            name={'password'}
            placeholder="Пароль"
            extraClass="mb-2"
            type="password"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeProfile({ name, email }));
            }}
            htmlType="submit"
            type="primary"
            size="large">
            Сохранить
          </Button>
        </form>
      </div>
    </>
  );
}
