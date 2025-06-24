import React from 'react'

type AddTodoFormProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex">
    <input
      type="text"
      spellCheck="false"
      className="mr-2 flex-1 border border-gray-300 p-2"
      placeholder="Add a new todo..."
      value={value}
      onChange={onChange}
    />
    <button type="submit" className="bg-blue-500 p-2 text-white">
      Add
    </button>
  </form>
)

export default AddTodoForm
