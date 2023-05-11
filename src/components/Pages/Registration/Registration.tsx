import React from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/registration.module.css';
import { Link } from 'react-router-dom';
import { createUser } from '../../../utils/api';

export function Registration() {
  const [name, setName] = React.useState('');
  const inputName = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const inputRef = React.useRef(null);
  const [email, setEmail] = React.useState('');
  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <div className={styles.registrationWrapper}>
      <h1>Регистрация</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({ email, password, name });
        }}
        className={styles.registrationForm}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputName}
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
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Button htmlType="submit">Зарегестрироваться</Button>
      </form>
      <p>
        Уже зарегестрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}
