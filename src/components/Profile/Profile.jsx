import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from './styles/profile.module.css';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getInformation } from '../../services/actions/getProfile';
import { changeProfileInformation } from '../../utils/api';

export function Profile() {
  const dispatch = useDispatch();
  const profileInformationRequest = useSelector(
    (store) => store.profileInformationReducer.profileInformationRequest,
  );
  function changeProfile(name, post) {
    changeProfileInformation(name, post);
  }
  const user = useSelector((store) => store.profileInformationReducer.profileData);
  useEffect(() => {
    dispatch(getInformation());
  }, []);

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
            <li className={styles.profileListItem}>Профиль</li>
            <li className={styles.profileListItem}>История заказов</li>
            <li className={styles.profileListItem}>Выход</li>
          </ul>
          <p
            className={`${styles.profileText} text text_type_main-default text_color_inactive mt-20`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.profileInputWrapper}>
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
            onClick={() => changeProfile(login, email)}
            htmlType="button"
            type="primary"
            size="large">
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
}
