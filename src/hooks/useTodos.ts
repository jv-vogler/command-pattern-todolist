import { useState } from 'react'

import { Command } from '../types/Command'
import { Todo } from '../types/Todo'
import { useCommands } from './useCommands'

export const useTodos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])
  const { executeCommand, undoCommand, redoCommand } = useCommands()

  const addTodoCommand = (todoText: string, completedStatus: boolean = false): Command => {
    const backupState = [...todos]
    const todoId = new Date().toISOString()

    return {
      execute() {
        if (todoText.trim() !== '') {
          setTodos([
            ...todos,
            {
              id: todoId,
              text: todoText,
              completed: completedStatus,
            },
          ])
        }
      },

      undo() {
        setTodos(backupState)
      },
    }
  }

  const addTodo = (todoText: string, completedStatus: boolean = false) => {
    executeCommand(addTodoCommand(todoText, completedStatus))
  }

  const toggleTodoCommand = (id: string): Command => {
    const backupState = [...todos]

    return {
      execute() {
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        )
      },

      undo() {
        setTodos(backupState)
      },
    }
  }

  const toggleTodo = (id: string) => {
    executeCommand(toggleTodoCommand(id))
  }

  const deleteTodoCommand = (id: string): Command => {
    const backupState = [...todos]

    return {
      execute() {
        setTodos(todos.filter((todo) => todo.id !== id))
      },

      undo() {
        setTodos(backupState)
      },
    }
  }

  const deleteTodo = (id: string) => {
    executeCommand(deleteTodoCommand(id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, undoCommand, redoCommand }
}
