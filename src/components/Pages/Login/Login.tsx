import AppHeader from '../../AppHeader/AppHeader';
import React from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/login.module.css';
import { Link } from 'react-router-dom';
import { logInProfile } from '../../../services/actions/logInOutProfile';
import { useAppDispatch } from '../../../index';

export function Login() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <div className={styles.loginWrapper}>
        <h1>Вход</h1>
        <form className={styles.loginForm}>
          <EmailInput onChange={onChange} value={email} name={'email'} isIcon={false} />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={'ShowIcon'}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Button
            htmlType="submit"
            extraClass={styles.button}
            onClick={(e) => {
              e.preventDefault();
              dispatch(logInProfile({ email, password }));
            }}>
            Войти
          </Button>
        </form>
        <p>
          Вы новый пользователь?
          <Link to="/registration">Зарегестрироваться</Link>
        </p>
        <p>
          Забыли пароль?
          <Link to="/password">Восстановить пароль</Link>
        </p>
      </div>
    </>
  );
}
