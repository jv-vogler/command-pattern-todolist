import React from 'react'

import { Command } from '../types/Command'

type HistoryProps = {
  commandHistory: Command[]
  historyPointer: number
}

const HistoryPointers: React.FC<HistoryProps> = ({ commandHistory, historyPointer }) => (
  <div className="my-4 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <p className="font-bold">History: </p>
      {commandHistory.map((_, index) => (
        <p key={index} className={index === historyPointer ? 'font-bold text-green-500' : ''}>
          [Command {index + 1}]
        </p>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <p className="font-bold">Pointer: </p>
      <p className="font-bold text-green-500">{historyPointer}</p>
    </div>
  </div>
)

export default HistoryPointers
