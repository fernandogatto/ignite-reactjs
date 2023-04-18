import { ReactNode } from 'react'

import { CycleProvider } from './Cycle'

interface IAppProviderProps {
  children: ReactNode
}

function AppProvider({ children }: IAppProviderProps) {
  return <CycleProvider>{children}</CycleProvider>
}

export default AppProvider
