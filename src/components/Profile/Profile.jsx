import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from './styles/profile.module.css';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeProfileInformation } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { logOutProfile } from '../../services/actions/logInOutProfile';

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileInformationRequest = useSelector(
    (store) => store.profileInformationReducer.profileInformationRequest,
  );
  const user = useSelector((store) => store.profileInformationReducer.profileData);
  function changeProfile(name, post) {
    changeProfileInformation(name, post);
  }
  const [login, setName] = useState(user.name);
  const changeName = (e) => {
    setName(e.target.value);
  };
  const [email, setEmail] = useState(user.email);
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  if (profileInformationRequest) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <AppHeader />
      <div className={styles.profileWrapper}>
        <div className={styles.profileListWrapper}>
          <ul className={`${styles.profileList} text text_type_main-medium`}>
            <li className={styles.profileListItem}>
              <Link className={styles.profileLink}>Профиль</Link>
            </li>
            <li className={styles.profileListItem}>
              <Link className={styles.profileLink}>История заказов</Link>
            </li>
            <li className={styles.profileListItem}>
              <Link
                onClick={(e) => {
                  dispatch(logOutProfile());
                  navigate('/');
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
            value={login}
            icon={'EditIcon'}
            name={'email'}
            placeholder="Имя"
            isIcon={true}
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
          <EmailInput
            value={12345}
            name={'password'}
            placeholder="Пароль"
            isIcon={true}
            extraClass="mb-2"
            type="password"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeProfile(login, email));
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
