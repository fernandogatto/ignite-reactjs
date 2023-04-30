import { createContext, ReactNode, useContext, useState } from 'react';

// interface ICheckoutContextProps {

// }

interface ICheckoutProviderProps {
  children: ReactNode
}

const CheckoutContext = createContext({} as any)

function CheckoutProvider({ children }: ICheckoutProviderProps) {
  const [coffees, setCoffess] = useState([])

  return (
    <CheckoutContext.Provider value={{}}>
      {children}
    </CheckoutContext.Provider>
  )
}

function useCheckout() {
  const context = useContext(CheckoutContext)

  return context
}

export { CheckoutProvider, useCheckout }
