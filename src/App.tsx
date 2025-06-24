import { useEffect, useState } from 'react'

import AddTodoForm from './components/AddTodoForm'
import HistoryPointers from './components/HistoryPointers'
import TodoList from './components/TodoList'
import UndoRedoButtons from './components/UndoRedoButtons'
import { useTodos } from './hooks/useTodos'

const App = () => {
  const [todoIntent, setTodoIntent] = useState('')
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    undoCommand,
    redoCommand,
    commandHistory,
    historyPointer,
  } = useTodos()

  // Register keyboard shortcuts for Commands
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey
      const isAltPressed = e.altKey

      if (isCtrlPressed && e.key === 'z') {
        undoCommand()
      }

      if (isAltPressed && e.key === 'z') {
        redoCommand()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [undoCommand, redoCommand])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.preventDefault()
    addTodo(todoIntent)
    setTodoIntent('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoIntent(e.target.value)
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <h1 className="mb-4 text-3xl font-semibold">Command Pattern - Todo List</h1>
      <UndoRedoButtons undo={undoCommand} redo={redoCommand} />
      <AddTodoForm value={todoIntent} onChange={handleChange} onSubmit={handleSubmit} />
      <HistoryPointers commandHistory={commandHistory} historyPointer={historyPointer} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  )
}

export default App
