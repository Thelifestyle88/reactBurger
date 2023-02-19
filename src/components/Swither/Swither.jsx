import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/style.module.css';

export function Switcher() {
  const [current, setCurrent] = React.useState('one');

  function getPostion(value) {
    setCurrent(value);
    const rootElement = document.getElementById('ingredients');
    const element = document.getElementById(value);
    const elementPostion = element.getBoundingClientRect();
    rootElement.scrollTo({
      top: elementPostion.top,
      behavior: 'smooth',
    });
    console.log(elementPostion);
  }

  return (
    <div className={styles.switcher}>
      <Tab value="one" active={current === 'one'} onClick={() => getPostion('one')}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={() => getPostion('two')}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={() => getPostion('three')}>
        Начинки
      </Tab>
    </div>
  );
}
