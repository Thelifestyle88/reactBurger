import { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles/profile.module.css';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeProfile } from '../../../services/actions/getProfile';
import { Link } from 'react-router-dom';
import { logOutProfile } from '../../../services/actions/logInOutProfile';
import { useAppDispatch, useAppSelector } from '../../..';

export function Profile() {
  const dispatch = useAppDispatch();
  const profileInformationRequest = useAppSelector(
    (store) => store.profileInformationReducer.profileInformationRequest,
  );
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);

  const [userData, setUserData] = useState({
    email: user === null ? ' ' : user.email,
    password: '',
    name: user === null ? ' ' : user.name,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    setUserData(() => ({
      email: user === null ? ' ' : user.email,
      password: '',
      name: user === null ? ' ' : user.name,
    }));
  }, [user]);
  if (profileInformationRequest) {
    return <p>Загрузка</p>;
  }
  return (
    { user } && (
      <div className={styles.profileWrapper}>
        <div className={styles.profileListWrapper}>
          <ul className={`${styles.profileList} text text_type_main-medium`}>
            <li className={styles.profileListItem}>
              <Link to={'/profile'} className={styles.profileLink}>
                Профиль
              </Link>
            </li>
            <li className={styles.profileListItem}>
              <Link to={'/profile/orders'} className={styles.profileLink}>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(changeProfile(userData));
          }}
          className={styles.profileInputWrapper}>
          <Input
            onChange={handleChange}
            value={userData.name}
            icon={'EditIcon'}
            name={'email'}
            placeholder="Имя"
            extraClass="mb-2"
          />
          <EmailInput
            onChange={handleChange}
            value={userData.email}
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
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>
      </div>
    )
  );
}
