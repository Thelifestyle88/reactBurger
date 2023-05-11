import AppHeader from '../../AppHeader/AppHeader';
import React from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/password.module.css';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

export function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <div className={styles.passwordWrapper}>
        <h1>Восстановление пароля</h1>
        <form className={styles.passwordForm}>
          <EmailInput onChange={onChange} value={email} name={'email'} isIcon={false} />
          <Button
            htmlType="submit"
            extraClass={styles.button}
            onClick={(e) => {
              e.preventDefault();
              forgotPassword(email).then((res) => {
                if (res.success) {
                  navigate('/reset-password');
                }
              });
            }}>
            Восстановить
          </Button>
        </form>
        <p>
          Впомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </>
  );
}
