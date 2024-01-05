import { useState } from "react"
import { Todo } from "../types/Todo"

export const useTodos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])

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
