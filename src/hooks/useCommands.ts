import { useState } from 'react'

import { Command } from '../domain/entities/Command'

export const useCommands = () => {
  const [commandHistory, setCommandHistory] = useState<Array<Command>>([])
  const [historyPointer, setHistoryPointer] = useState<number>(-1)

  const executeCommand = (command: Command) => {
    command.execute()
    setCommandHistory((prevCommands) => [...prevCommands.slice(0, historyPointer + 1), command])
    setHistoryPointer((prevPointer) => prevPointer + 1)
  }

  const undoCommand = () => {
    if (historyPointer < 0) return

    const lastCommand = commandHistory[historyPointer]
    setHistoryPointer((prevPointer) => prevPointer - 1)
    lastCommand.undo()
  }

  const redoCommand = () => {
    if (historyPointer >= commandHistory.length - 1) return

    const nextCommand = commandHistory[historyPointer + 1]
    setHistoryPointer((prevPointer) => prevPointer + 1)
    nextCommand.execute()
  }

  return { executeCommand, undoCommand, redoCommand }
}
