import { useEffect } from 'react'

import { useFormContext } from 'react-hook-form'

import { useCycle } from '@hooks/Cycle'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

interface INewCycleFormProps {
  setIsSubmitDisabled: (isSubmit: boolean) => void
}

function NewCycleForm({ setIsSubmitDisabled }: INewCycleFormProps) {
  const { register, watch } = useFormContext()

  const { activeCycle } = useCycle()

  const isActiveCycle = !!activeCycle

  const task = watch('task')
  const isDisabled = !task

  useEffect(() => {
    setIsSubmitDisabled(isDisabled)
  }, [isDisabled, setIsSubmitDisabled])

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="taskSuggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={isActiveCycle}
        {...register('task')}
      />

      <datalist id="taskSuggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={isActiveCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

export default NewCycleForm
