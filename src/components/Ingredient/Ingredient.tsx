import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/styles.module.css';
import { addIngredientDetails } from '../../services/actions/getIngredientDetails';
import { useDrag } from 'react-dnd/dist/hooks/useDrag';
import { TIngredient } from '../../utils/typesData';
import { useAppDispatch } from '../../index';
import { Link, useLocation } from 'react-router-dom';

type TIngredientProps = {
  ingredient: TIngredient;
  count: number;
};

export function Ingredient({ ingredient, count }: TIngredientProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [{ isDrag }, drag] = useDrag({
    type: 'NEW_INGREDIENT',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging,
    }),
  });

  const handleClick = () => {
    dispatch(addIngredientDetails(ingredient));
  };

  return (
    <Link
      data-testid={'bunIngredientTarget'}
      to={{ pathname: `ingredients/${ingredient._id}` }}
      state={{ background: location }}
      replace={true}
      ref={drag}
      onClick={() => handleClick()}
      className={`${styles.ingredient} mt-6 text text_type_main-default`}>
      <Counter extraClass={`${styles.counter} m-1`} count={count} size="default" />
      <img className="mr-4 ml-4 mb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.ingredientPriceWrap} mb-1`}>
        <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.description}>{ingredient.name}</p>
    </Link>
  );
}
