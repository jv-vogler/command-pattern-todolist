import { useEffect, useState } from 'react'

import { useTodos } from './hooks/useTodos'

const App = () => {
  const [todoIntent, setTodoIntent] = useState('')
  const { todos, addTodo, deleteTodo, toggleTodo, undoCommand, redoCommand, commandHistory, historyPointer } = useTodos()

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

  return (
    <div className="mx-auto mt-8 max-w-md">
      <h1 className="mb-4 text-3xl font-semibold">Command Pattern - Todo List</h1>

      <div className="flex gap-2">
        <button
          className="my-2 rounded bg-orange-500 px-2 py-1 font-bold text-white"
          onClick={() => undoCommand()}
        >
          Undo
        </button>
        <button
          className="my-2 rounded bg-orange-500 px-2 py-1 font-bold text-white"
          onClick={() => redoCommand()}
        >
          Redo
        </button>
      </div>

      {/* Add New Todo Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(todoIntent)
          setTodoIntent('')
        }}
        className="flex"
      >
        <input
          type="text"
          spellCheck="false"
          className="mr-2 flex-1 border border-gray-300 p-2"
          placeholder="Add a new todo..."
          value={todoIntent}
          onChange={(e) => setTodoIntent(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 p-2 text-white">
          Add
        </button>
      </form>

      {/* Pointers */}
      <div className='flex flex-col gap-2 my-4'>
        <div className='flex gap-2 items-center'>
          <p className='font-bold'>History: </p>
          {commandHistory.map((_, index) => <p key={index} className={index === historyPointer ? 'font-bold text-green-500' : ''}>[Command {index + 1}]</p>)}
        </div>

        <div className='flex gap-2 items-center'>
          <p className='font-bold'>Pointer: </p>
          <p className='font-bold text-green-500'>{historyPointer}</p>
        </div>
      </div>

      {/* Todos List */}
      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between border-b border-gray-300 py-2 ${todo.completed ? 'text-gray-500 line-through' : ''
              }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
