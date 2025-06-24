import React from 'react'

type UndoRedoProps = {
  undo: () => void
  redo: () => void
}

const UndoRedoButtons: React.FC<UndoRedoProps> = ({ undo, redo }) => (
  <div className="flex gap-2">
    <button className="my-2 rounded bg-orange-500 px-2 py-1 font-bold text-white" onClick={undo}>
      Undo
    </button>
    <button className="my-2 rounded bg-orange-500 px-2 py-1 font-bold text-white" onClick={redo}>
      Redo
    </button>
  </div>
)

export default UndoRedoButtons
