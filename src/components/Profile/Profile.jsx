import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import styles from './styles/profile.module.css';
import { Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export function Profile() {
  const profileData = useSelector((store) => store.profileInformationReducer.user);
  const [name, setName] = React.useState(profileData.name);
  const onChange = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.profileWrapper}>
        <ul>
          <li>Профиль</li>
          <li>История заказов</li>
          <li>Выход</li>
        </ul>
        <div>
          <Input
            onChange={onChange}
            value={name}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />
        </div>
      </div>
    </>
  );
}
