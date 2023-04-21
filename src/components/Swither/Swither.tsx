import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/style.module.css';

interface ISwitcherProps {
  bun: boolean;
  sauce: boolean;
  mains: boolean;
}

export function Switcher({ bun, sauce, mains }: ISwitcherProps) {
  return (
    <div className={styles.switcher}>
      <Tab onClick={console.log} value="one" active={bun}>
        Булки
      </Tab>
      <Tab onClick={console.log} value="two" active={sauce}>
        Соусы
      </Tab>
      <Tab onClick={console.log} value="three" active={mains}>
        Начинки
      </Tab>
    </div>
  );
}
