import React from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/newPassword.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../utils/api';

export function NewPassword() {
  const navigate = useNavigate();
  const [token, setCode] = React.useState('');
  const inputName = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const inputRef = React.useRef(null);
  return (
    <>
      <div className={styles.newPasswordWrapper}>
        <h1>Восстановление пароля</h1>
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
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setCode(e.target.value)}
            value={token}
            name={'name'}
            error={false}
            ref={inputName}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Button
            htmlType="submit"
            onClick={(e) => {
              e.preventDefault();
              resetPassword(password, token).then((res) => {
                if (res.success) {
                  navigate('/');
                }
              });
            }}>
            Сохранить
          </Button>
        </form>
        <p>
          Уже зарегестрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </>
  );
}
