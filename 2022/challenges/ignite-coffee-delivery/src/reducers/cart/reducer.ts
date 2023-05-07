import { ICoffeeCart } from '@contexts/CartContext'

import { populateStorage } from '@utils/storage'

import { cartActionTypes } from './types'

interface ICartState {
  products: Array<ICoffeeCart>
  quantityInCart: number | 0
  priceInCart: number | 0
}

export function cartReducer(state: ICartState, action: any) {
  const products = state.products
  let quantityInCart = state.quantityInCart
  let priceInCart = state.priceInCart

  const type = action.type
  const product = action.payload.product

  const currentProduct = products.find((item) => item.id === product.id)

  switch (type) {
    case cartActionTypes.ADD_TO_CART:
      if (currentProduct && currentProduct.id) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products[productIndex] = {
          ...products[productIndex],
          quantity: products[productIndex].quantity + 1,
          price: products[productIndex].price + product.price,
        }
      } else {
        products.push({
          ...product,
          quantity: 1,
        })
      }

      quantityInCart = quantityInCart + 1
      priceInCart = priceInCart + product.price

      populateStorage(products, quantityInCart, priceInCart)

      return {
        ...state,
        products,
        quantityInCart,
        priceInCart,
      }
    case cartActionTypes.REMOVE_QUANTITY:
      if (currentProduct && currentProduct.id && currentProduct.quantity > 1) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products[productIndex] = {
          ...products[productIndex],
          quantity: products[productIndex].quantity - 1,
          price: products[productIndex].price - product.price,
        }
      } else if (currentProduct && currentProduct.id && currentProduct.quantity === 1) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products.splice(productIndex, 1)
      }

      quantityInCart = quantityInCart - 1
      priceInCart = priceInCart - product.price

      populateStorage(products, quantityInCart, priceInCart)

      return {
        ...state,
        products,
        quantityInCart,
        priceInCart,
      }
    case cartActionTypes.REMOVE_FROM_CART:
      if (currentProduct && currentProduct.id) {
        const productIndex = products.findIndex((item) => item.id === product.id)

        products.splice(productIndex, 1)

        quantityInCart = quantityInCart - currentProduct.quantity
        priceInCart = priceInCart - product.price

        populateStorage(products, quantityInCart, priceInCart)
      }

      return {
        ...state,
        products,
        quantityInCart,
        priceInCart,
      }
    default:
      throw new Error();
  }
}
