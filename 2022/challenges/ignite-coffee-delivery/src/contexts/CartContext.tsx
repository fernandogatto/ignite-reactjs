import { createContext, ReactNode, useContext, useReducer } from 'react';

import { cartReducer } from '@reducers/cart/reducer';
import { addToCartAction, removeFromCartAction, removeQuantityAction } from '@reducers/cart/actions';

import { ICoffee } from '@constants/coffees';

import { getStorage } from '@utils/storage';

interface ICartProviderProps {
  children: ReactNode
}

export interface ICoffeeCart extends ICoffee {
  quantity: number | 0
}

interface ICartContextProps {
  products: Array<ICoffeeCart>,
  quantityInCart: number,
  addToCart: (product: ICoffee) => void,
  removeQuantity: (product: ICoffee) => void,
  removeFromCart: (product: ICoffee) => void,
}

export const CartContext = createContext({} as ICartContextProps)

function CartProvider({ children }: ICartProviderProps) {
  const { productsStorage, quantityInCartStorage } = getStorage()

  const initialState = {
    products: productsStorage,
    quantityInCart: quantityInCartStorage,
  }

  const [cartState, dispatch] = useReducer(cartReducer, initialState)
  const { products, quantityInCart } = cartState

  console.log('products',products)
  console.log('quantityInCart',quantityInCart)

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
      quantityInCart,
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
