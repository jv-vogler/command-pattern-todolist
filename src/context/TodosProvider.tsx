import { ReactNode, createContext, useMemo, useState } from 'react'

import { Todo } from '../types/Todo'

type TodosContextType = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodosContext = createContext<TodosContextType | undefined>(undefined)

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<Todo>>([])

  const value = useMemo(() => ({ todos, setTodos }), [todos])

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
