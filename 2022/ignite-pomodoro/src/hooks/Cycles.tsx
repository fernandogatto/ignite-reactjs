import { ReactNode, createContext, useContext, useState } from 'react'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICyclesContextProps {
  cycles: ICycle[]
  activeCycleId: string | null
  amountSecondsPassed: number
  activeCycle: ICycle | undefined
  interval: number
  setCyclesPassed: (newCycle: ICycle) => void
  setActiveCycle: (id: string | null) => void
  setSecondsPassed: (seconds: number) => void
  setIntervalCycle: (interval: number) => void
  handleInterruptActiveCycle: () => void
  handleFinishActiveCycle: () => void
}

interface ICyclesProviderProps {
  children: ReactNode
}

const CyclesContext = createContext({} as ICyclesContextProps)

function CyclesProvider({ children }: ICyclesProviderProps) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [interval, setInterval] = useState(0)

  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  console.log('cycles', cycles)

  function setCyclesPassed(newCycle: ICycle) {
    setCycles([...cycles, newCycle])
  }

  function setActiveCycle(id: string | null) {
    setActiveCycleId((state) => id)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function setIntervalCycle(interval: number) {
    setInterval(interval)
  }

  function handleInterruptActiveCycle() {
    if (activeCycle) {
      const cycleIndex = cycles.findIndex((item) => item.id === activeCycleId)

      cycles[cycleIndex] = {
        ...cycles[cycleIndex],
        interruptedDate: new Date(),
      }

      clearInterval(interval)

      setActiveCycleId(null)
    }
  }

  function handleFinishActiveCycle() {
    if (activeCycle) {
      const cycleIndex = cycles.findIndex(
        (item: ICycle) => item.id === activeCycleId,
      )

      cycles[cycleIndex] = {
        ...cycles[cycleIndex],
        finishedDate: new Date(),
      }

      clearInterval(interval)

      setActiveCycleId(null)

      document.title = `${activeCycle.task} - 00:00`
    }
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        amountSecondsPassed,
        activeCycle,
        interval,
        setCyclesPassed,
        setActiveCycle,
        setSecondsPassed,
        setIntervalCycle,
        handleInterruptActiveCycle,
        handleFinishActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

function useCycles() {
  const context = useContext(CyclesContext)

  return context
}

export { CyclesProvider, useCycles }
