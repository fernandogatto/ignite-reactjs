import { ICoffeeCart } from '@contexts/CartContext'

import { cartActionTypes } from './types'

interface ICartState {
  products: Array<ICoffeeCart>
}

export function cartReducer(state: ICartState, action: any) {
  const products = state.products
  const type = action.type
  const product = action.payload.product

  const currentProduct = products.find((item) => item.id === product.id)

  switch (type) {
    case cartActionTypes.ADD_TO_CART:
      if (currentProduct && currentProduct.id) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products[productIndex] = {
          ...products[productIndex],
          quantity: products[productIndex].quantity + 1
        }
      } else {
        products.push({
          ...product,
          quantity: 1,
        })
      }

      return {
        ...state,
        products,
      }
    case cartActionTypes.REMOVE_QUANTITY:
      if (currentProduct && currentProduct.id && currentProduct.quantity > 1) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products[productIndex] = {
          ...products[productIndex],
          quantity: products[productIndex].quantity - 1
        }
      } else if (currentProduct && currentProduct.id && currentProduct.quantity === 1) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products.splice(productIndex, 1)
      }

      return {
        ...state,
        products,
      }
    case cartActionTypes.REMOVE_FROM_CART:
      if (currentProduct && currentProduct.id) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products.splice(productIndex, 1)
      }

      return {
        ...state,
        products,
      }
    default:
      throw new Error();
  }
}
