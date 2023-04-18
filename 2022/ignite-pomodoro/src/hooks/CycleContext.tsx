import { ReactNode, createContext, useContext, useState } from 'react'

import { ICycle } from '@interfaces'

interface ICreateCycleData {
  task: string
  minutesAmount: number
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
  createNewCycle: (data: ICreateCycleData) => void
  interruptActiveCycle: () => void
  finishActiveCycle: () => void
}

interface ICyclesProviderProps {
  children: ReactNode
}

const CycleContext = createContext({} as ICyclesContextProps)

function CycleProvider({ children }: ICyclesProviderProps) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [interval, setInterval] = useState(0)

  const activeCycle = cycles.find((item) => item.id === activeCycleId)

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

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCyclesPassed(newCycle)
    setActiveCycle(id)
    setSecondsPassed(0)
  }

  function interruptActiveCycle() {
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

  function finishActiveCycle() {
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
    <CycleContext.Provider
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
        createNewCycle,
        interruptActiveCycle,
        finishActiveCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}

function useCycle() {
  const context = useContext(CycleContext)

  return context
}

export { CycleProvider, useCycle }
