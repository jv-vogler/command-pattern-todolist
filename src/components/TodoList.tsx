import React, { useState } from 'react'

import { Todo } from '../types/Todo'

type TodoListProps = {
  todos: Todo[]
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
  // if (todos.length) {
  //   useState()
  // }
  
  return (
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
  )
}

export default TodoList
