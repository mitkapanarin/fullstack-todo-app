import React from 'react'

const InputField = ({label, name, type, placeholder, onChange, value}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input value={value} onChange={onChange} type={type} name={name} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={placeholder} required />
    </div>
  )
}

export default InputField