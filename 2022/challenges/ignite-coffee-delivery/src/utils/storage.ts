import { ICoffeeCart } from "@contexts/CartContext"

export function getStorage() {
  const productsStorage = JSON.parse(localStorage.getItem('@igniteCoffeeDelivery:products') || '[]')
  const quantityInCartStorage = Number(localStorage.getItem('@igniteCoffeeDelivery:quantityInCart'))

  return { productsStorage, quantityInCartStorage }
}

export function populateStorage(products: Array<ICoffeeCart>, quantityInCart: number) {
  localStorage.setItem('@igniteCoffeeDelivery:products', JSON.stringify(products))
  localStorage.setItem('@igniteCoffeeDelivery:quantityInCart', String(quantityInCart))
}
