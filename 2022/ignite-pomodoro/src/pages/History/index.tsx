import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCycle } from '@hooks/Cycle'

import { HistoryContainer, HistoryList, Status } from './styles'

function History() {
  const { cycles } = useCycle()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Criação</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.length === 0 && (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan={4}>Nenhum item existente</td>
              </tr>
            )}

            {cycles.length > 0 &&
              cycles.map((item) => (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(item.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {!item.interruptedDate && !item.finishedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}

                    {item.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {item.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export default History
