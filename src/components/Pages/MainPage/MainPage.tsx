import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../BurgerConstructor/BurgerConstructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles/main.module.css';

function MainPage() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </>
  );
}

export default MainPage;
