import AppHeader from '../AppHeader/AppHeader';
import React from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInProfile } from '../../services/actions/logInProfile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            ref={inputRef}
            onIconClick={onIconClick}
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
          <ProtectedRoute onlyUnAuth={true}>
            <Link to="/registration">Зарегестрироваться</Link>
          </ProtectedRoute>
        </p>
        <p>
          Забыли пароль?
          <ProtectedRoute onlyUnAuth={true}>
            <Link to="/password">Восстановить пароль</Link>
          </ProtectedRoute>
        </p>
      </div>
    </>
  );
}
