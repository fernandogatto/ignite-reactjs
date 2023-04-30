import { ReactNode } from 'react'

import { CheckoutProvider } from './CheckoutContext'

interface IAppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: IAppProviderProps) {
  return <CheckoutProvider>{children}</CheckoutProvider>
}
