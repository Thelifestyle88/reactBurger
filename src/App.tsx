import React from 'react';
import { useEffect } from "react"
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import Modal from './components/Modal/Modal';
import { IngredientDetails } from './components/IngredientDetails/IngredientDetails';
import {OrderDetails} from './components/OrderDetails/OrderDetails'

function App() {

  const [ingredients, setIngredients] = React.useState([])

  useEffect(()=> {
      fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((res) => {return res.json()})
      .then((res) => {setIngredients(res.data)})
      .catch(console.error)
  }, [])

  const [selectedIngredient, setSelectedIngredient] = React.useState(null)

  const [order, setOrder] = React.useState(null)


  return (
    <>
    <AppHeader />
    <main className='content'>
    <BurgerIngredients ingredients={ingredients} setElement={setSelectedIngredient} />
    <BurgerConstructor ingredients={ingredients} order={setOrder}  />
    </main>
    {Boolean(selectedIngredient) && 
    (<Modal 
    name ='Детали ингредиента'
    onClose={()=> {setSelectedIngredient(null)}}
    children={<IngredientDetails ingredient={selectedIngredient}/>}/>
    )}
    {Boolean(order) &&
    (<Modal 
    name =''
    onClose={() => {setOrder(null)}}
    children={<OrderDetails order={order}/>}/>)}
    </>
  );
}

export default App;
