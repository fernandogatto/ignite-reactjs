import { ReactNode } from 'react'

import { CyclesProvider } from './Cycles'

interface IAppProviderProps {
  children: ReactNode
}

function AppProvider({ children }: IAppProviderProps) {
  return <CyclesProvider>{children}</CyclesProvider>
}

export default AppProvider
