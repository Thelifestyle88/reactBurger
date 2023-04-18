import AppHeader from '../AppHeader/AppHeader';
import React from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/registration.module.css';
import { Link } from 'react-router-dom';
import { createUser } from '../../utils/api';

export function Registration() {
  const [name, setName] = React.useState('');
  const inputName = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const [email, setEmail] = React.useState('');
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.registrationWrapper}>
        <h1>Регистрация</h1>
        <form className={styles.registrationForm}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={inputName}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <EmailInput onChange={onChange} value={email} name={'email'} isIcon={false} />
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
          <Button
            htmlType="submit"
            onClick={(e) => {
              e.preventDefault();
              createUser({ email, password, name });
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
