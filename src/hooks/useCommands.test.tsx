import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Command } from '../types/Command'
import { useCommands } from './useCommands'

describe('useCommands', () => {
  const setup = () => {
    const mockExecute = vi.fn()
    const mockUndo = vi.fn()
    const mockCommand: Command = {
      execute() {
        mockExecute()
      },
      undo() {
        mockUndo()
      },
    }

    return { mockExecute, mockUndo, mockCommand }
  }

  describe('executeCommand', () => {
    it('executes a command when executeCommand is called', () => {
      const { result } = renderHook(useCommands)
      const { mockCommand, mockExecute } = setup()

      act(() => {
        result.current.executeCommand(mockCommand)
      })

      expect(mockExecute).toHaveBeenCalledOnce()
    })
  })

  describe('undoCommand', () => {
    it('undoes the last command when undoCommand is called', () => {
      const { result } = renderHook(useCommands)
      const { mockCommand, mockUndo } = setup()

      act(() => {
        result.current.executeCommand(mockCommand)
      })

      act(() => {
        result.current.undoCommand()
      })

      expect(mockUndo).toHaveBeenCalledOnce()
    })
  })

  describe('redoCommand', () => {
    it('redoes the last undone when redoCommand is called', () => {
      const { result } = renderHook(useCommands)
      const { mockCommand, mockExecute } = setup()

      act(() => {
        result.current.executeCommand(mockCommand)
      })

      act(() => {
        result.current.undoCommand()
      })

      act(() => {
        result.current.redoCommand()
      })

      expect(mockExecute).toHaveBeenCalledTimes(2)
    })
  })

  describe('when executing multiple commands', () => {
    it('executes the correct commands in sequence', () => {
      const { result } = renderHook(useCommands)
      const { mockCommand: mockCommand1, mockExecute: mockExecute1, mockUndo: mockUndo1 } = setup()
      const { mockCommand: mockCommand2, mockExecute: mockExecute2, mockUndo: mockUndo2 } = setup()
      const { mockCommand: mockCommand3, mockExecute: mockExecute3, mockUndo: mockUndo3 } = setup()
      const { mockCommand: mockCommand4, mockExecute: mockExecute4, mockUndo: mockUndo4 } = setup()

      act(() => {
        result.current.executeCommand(mockCommand1)
      })
      expect.soft(mockExecute1).toBeCalledTimes(1)

      act(() => {
        result.current.executeCommand(mockCommand2)
      })
      expect.soft(mockExecute2).toBeCalledTimes(1)

      act(() => {
        result.current.executeCommand(mockCommand3)
      })
      expect.soft(mockExecute3).toBeCalledTimes(1)

      act(() => {
        result.current.undoCommand()
      })
      expect.soft(mockUndo3).toBeCalledTimes(1)

      act(() => {
        result.current.undoCommand()
      })
      expect.soft(mockUndo2).toBeCalledTimes(1)

      act(() => {
        result.current.undoCommand()
      })
      expect.soft(mockUndo1).toBeCalledTimes(1)

      act(() => {
        result.current.redoCommand()
      })
      expect.soft(mockExecute1).toBeCalledTimes(2)

      act(() => {
        result.current.redoCommand()
      })
      expect.soft(mockExecute2).toBeCalledTimes(2)

      act(() => {
        result.current.executeCommand(mockCommand4)
      })
      expect.soft(mockExecute4).toBeCalledTimes(1)

      act(() => {
        result.current.undoCommand()
      })
      expect.soft(mockUndo4).toBeCalledTimes(1)

      act(() => {
        result.current.undoCommand()
      })
      expect.soft(mockUndo2).toBeCalledTimes(2)

      act(() => {
        result.current.redoCommand()
      })
      expect.soft(mockExecute2).toBeCalledTimes(3)

      act(() => {
        result.current.redoCommand()
      })
      expect.soft(mockExecute4).toBeCalledTimes(2)
    })
  })
})
