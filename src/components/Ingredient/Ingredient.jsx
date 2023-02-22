import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/styles.module.css';
import { useDispatch } from 'react-redux';
import { addIngredientDetails } from '../../services/actions/getIngredientDetails';
import { useDrag } from 'react-dnd/dist/hooks/useDrag';
import PropTypes from 'prop-types';

export function Ingredient({ ingredient, count }) {
  const dispatch = useDispatch();

  const [{ isDrag }, drag] = useDrag({
    type: 'NEW_INGREDIENT',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging,
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => {
        dispatch(addIngredientDetails(ingredient));
      }}
      className={`${styles.ingredient} mt-6 text text_type_main-default`}>
      <Counter className={styles.counter} count={count} size="default" extraClass="m-1" />
      <img className="mr-4 ml-4 mb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.ingredientPriceWrap} mb-1`}>
        <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.description}>{ingredient.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  count: PropTypes.number.isRequired,
  ingredient: PropTypes.object.isRequired,
};
