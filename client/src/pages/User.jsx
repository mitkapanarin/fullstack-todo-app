import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../store/API/userApi'
import { updateUserStateData } from '../store/Slices/userSlice'
import Toast from '../components/Toast'

const User = () => {
  const state = useSelector(x => x)
  const dispatch = useDispatch()
  console.log(state.User)
  const [data, setData] = useState(state.User)
  const [popup, setPopup] = useState(false)

  const [updateUser] = useUpdateUserMutation()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(data)
      dispatch(updateUserStateData(data))
      setPopup(true)
      setTimeout(() => setPopup(false), 2500)
    }
    catch (err) {
      console.log(err)
    }

  }

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your new name</label>
        <input onChange={onChange} value={data.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your new Email address</label>
        <input onChange={onChange} value={data.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your new Password</label>
        <input onChange={onChange} value={data.password} name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      <div className='text-2xl text-center'>
        {popup && <Toast message="Your data have been successfully updated" />}
      </div>
    </form>
  )
}

export default User