import { useState } from 'react'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from 'react-hook-form'

import { HandPalm, Play } from 'phosphor-react'

import { useCycles } from '@hooks/Cycles'

import { Countdown, NewCycleForm } from './components'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

function Home() {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { reset, handleSubmit } = newCycleForm

  const {
    activeCycle,
    setCyclesPassed,
    setActiveCycle,
    setSecondsPassed,
    handleInterruptActiveCycle,
  } = useCycles()

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm setIsSubmitDisabled={setIsSubmitDisabled} />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            onClick={handleInterruptActiveCycle}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export default Home
