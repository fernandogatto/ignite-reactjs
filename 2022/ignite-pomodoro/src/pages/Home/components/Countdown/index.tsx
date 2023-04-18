import { useEffect } from 'react'

import { differenceInSeconds } from 'date-fns'

import { useCycle } from '@hooks/Cycle'

import { CountdownContainer, Separator } from './styles'

function Countdown() {
  const {
    amountSecondsPassed,
    interval,
    activeCycle,
    setSecondsPassed,
    setIntervalCycle,
    finishActiveCycle,
  } = useCycle()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let _interval: number = interval

    if (activeCycle) {
      _interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceSeconds >= totalSeconds) {
          setSecondsPassed(totalSeconds)

          finishActiveCycle()
        } else {
          setSecondsPassed(differenceSeconds)
        }
      }, 1000)

      setIntervalCycle(_interval)
    }

    return () => {
      clearInterval(_interval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}

export default Countdown
