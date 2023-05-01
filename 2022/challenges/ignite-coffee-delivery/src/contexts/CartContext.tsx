import { createContext, ReactNode, useContext, useReducer } from 'react';

import { cartReducer } from '@reducers/cart/reducer';
import { addToCartAction, removeFromCartAction, removeQuantityAction } from '@reducers/cart/actions';

import { ICoffee } from '@constants/coffees';

interface ICartProviderProps {
  children: ReactNode
}

export interface ICoffeeCart extends ICoffee {
  quantity: number | 0
}

interface ICartContextProps {
  products: Array<ICoffeeCart>,
  addToCart: (product: ICoffee) => void,
  removeQuantity: (product: ICoffee) => void,
  removeFromCart: (product: ICoffee) => void,
}

const CartContext = createContext({} as ICartContextProps)

function CartProvider({ children }: ICartProviderProps) {
  const initialState = {
    products: [],
  }

  const [cartState, dispatch] = useReducer(cartReducer, initialState)
  const { products } = cartState

  console.log('products',products)

  function addToCart(product: ICoffee) {
    dispatch(addToCartAction(product))
  }

  function removeQuantity(product: ICoffee) {
    dispatch(removeQuantityAction(product))
  }

  function removeFromCart(product: ICoffee) {
    dispatch(removeFromCartAction(product))
  }

  return (
    <CartContext.Provider value={{
      products,
      addToCart,
      removeQuantity,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)

  return context
}

export { CartProvider, useCart }