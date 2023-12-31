import { useEffect, useState } from 'react'

import { useTodos } from './hooks/useTodos'

const App = () => {
  const [todoIntent, setTodoIntent] = useState('')
  const { todos, addTodo, deleteTodo, toggleTodo, undoCommand, redoCommand } = useTodos()

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
          className="mr-2 flex-1 border border-gray-300 p-2"
          placeholder="Add a new todo..."
          value={todoIntent}
          onChange={(e) => setTodoIntent(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 p-2 text-white">
          Add
        </button>
      </form>

      {/* Todos List */}
      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between border-b border-gray-300 py-2 ${
              todo.completed ? 'text-gray-500 line-through' : ''
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
