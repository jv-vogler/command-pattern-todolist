import { useContext } from 'react'

import { TodosContext } from '../context/TodosProvider'

export const useTodos = () => {
  const value = useContext(TodosContext)

  if (value === undefined) {
    throw new Error('You forgot the TodosContext Provider')
  }

  const { todos, setTodos } = value

  const addTodo = (todoText: string, completedStatus: boolean = false) => {
    if (todoText.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text: todoText,
          completed: completedStatus,
        },
      ])
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
