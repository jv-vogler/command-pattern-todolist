import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TodosProvider } from '../context/TodosProvider'
import { useTodos } from './useTodos'

describe('useTodos', () => {
  describe('when used without TodosProvider', () => {
    it('throws an error', () => {
      expect(() => {
        renderHook(() => useTodos())
      }).toThrow('You forgot the TodosContext Provider')
    })
  })

  describe('when used within the TodosProvider', () => {
    const customRenderHook = () =>
      renderHook(() => useTodos(), {
        wrapper: ({ children }) => <TodosProvider>{children}</TodosProvider>,
      })

    describe('addTodo', () => {
      describe('when passing a valid text', () => {
        it('adds a new todo to the list', () => {
          const { result } = customRenderHook()

          act(() => {
            result.current.addTodo('Test my app')
          })

          expect(result.current.todos[0]).toHaveProperty('text', 'Test my app')
        })
      })

      describe('when passing empty text', () => {
        it('does not add a todo to the list', () => {
          const { result } = customRenderHook()

          act(() => {
            result.current.addTodo('')
          })

          act(() => {
            result.current.addTodo('   ')
          })

          expect(result.current.todos).toHaveLength(0)
        })
      })

      describe('when not passing completed as an argument', () => {
        it('adds todo with completed set to false', () => {
          const { result } = customRenderHook()

          act(() => {
            result.current.addTodo('Test my app')
          })

          expect(result.current.todos[0]).toHaveProperty('completed', false)
        })
      })

      describe('when passing completed as an argument', () => {
        it('adds todo with the correct completed property', () => {
          const { result } = customRenderHook()

          act(() => {
            result.current.addTodo('Test my app', true)
          })

          expect(result.current.todos[0]).toHaveProperty('completed', true)
        })
      })
    })

    describe('toggleTodo', () => {
      it("correctly toggles a todo's completed property", () => {
        const { result } = customRenderHook()

        act(() => {
          result.current.addTodo('Test my app')
        })

        expect.soft(result.current.todos[0]).toHaveProperty('completed', false)

        act(() => {
          result.current.toggleTodo(result.current.todos[0].id)
        })

        expect.soft(result.current.todos[0]).toHaveProperty('completed', true)
      })
    })

    describe('deleteTodo', () => {
      it('correctly deletes a todo from the list', () => {
        const { result } = customRenderHook()

        act(() => {
          result.current.addTodo('Test my app')
        })

        act(() => {
          result.current.deleteTodo(result.current.todos[0].id)
        })

        expect(result.current.todos).toHaveLength(0)
      })
    })

    describe('undoCommand', () => {
      it('correctly undoes the last command', () => {
        const { result } = customRenderHook()

        act(() => {
          result.current.addTodo('Test my app')
        })

        act(() => {
          result.current.undoCommand()
        })

        expect(result.current.todos).toHaveLength(0)
      })
    })

    describe('redoCommand', () => {
      it('correctly redoes the last undone command', () => {
        const { result } = customRenderHook()

        act(() => {
          result.current.addTodo('Test my app')
        })
        const todo = result.current.todos[0]

        act(() => {
          result.current.undoCommand()
        })

        act(() => {
          result.current.redoCommand()
        })

        expect(result.current.todos[0]).toEqual(todo)
      })
    })

    describe('when executing multiple commands', () => {
      it('executes the correct commands in sequence', () => {
        const { result } = customRenderHook()

        act(() => {
          result.current.addTodo('Command1')
        })
        expect.soft(result.current.todos[0]).toHaveProperty('text', 'Command1')

        act(() => {
          result.current.toggleTodo(result.current.todos[0].id)
        })
        expect.soft(result.current.todos[0]).toHaveProperty('completed', true)

        act(() => {
          result.current.deleteTodo(result.current.todos[0].id)
        })
        expect.soft(result.current.todos).toHaveLength(0)

        act(() => {
          result.current.addTodo('Command2', true)
        })
        expect.soft(result.current.todos[0]).toHaveProperty('text', 'Command2')

        act(() => {
          result.current.toggleTodo(result.current.todos[0].id)
        })
        expect.soft(result.current.todos[0]).toHaveProperty('completed', false)

        act(() => {
          result.current.undoCommand()
        })
        expect.soft(result.current.todos[0]).toHaveProperty('completed', true)

        act(() => {
          result.current.undoCommand()
        })
        expect.soft(result.current.todos).toHaveLength(0)

        act(() => {
          result.current.undoCommand()
        })
        expect.soft(result.current.todos[0]).toHaveProperty('text', 'Command1')

        act(() => {
          result.current.redoCommand()
        })
        expect.soft(result.current.todos).toHaveLength(0)

        act(() => {
          result.current.redoCommand()
        })
        expect.soft(result.current.todos[0]).toHaveProperty('completed', true)

        act(() => {
          result.current.redoCommand()
        })
        expect.soft(result.current.todos[0]).toHaveProperty('completed', false)
      })
    })
  })
})
