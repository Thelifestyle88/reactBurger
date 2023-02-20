import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/style.module.css';

export function Switcher({ bun, sauce, mains }) {
  return (
    <div className={styles.switcher}>
      <Tab value="one" active={bun}>
        Булки
      </Tab>
      <Tab value="two" active={sauce}>
        Соусы
      </Tab>
      <Tab value="three" active={mains}>
        Начинки
      </Tab>
    </div>
  );
}
