import AppHeader from '../AppHeader/AppHeader';
import React from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/newPassword.module.css';
import { Link } from 'react-router-dom';

export function NewPassword() {
  const [code, setCode] = React.useState('');
  const inputName = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.newPasswordWrapper}>
        <h1>Регистрация</h1>
        <form className={styles.newPasswordForm}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={'ShowIcon'}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={'name'}
            error={false}
            ref={inputName}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Button
            htmlType="submit"
            onClick={(e) => {
              e.preventDefault();
            }}>
            Зарегестрироваться
          </Button>
        </form>
        <p>
          Уже зарегестрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </>
  );
}
