import React, { useState } from 'react'
import InputField from './InputField'
import { useCreateTaskMutation } from '../store/API/tasksApi'
import { useSelector } from 'react-redux'


const AddTask = () => {
  const state = useSelector(x => x)
  console.log(state.User.id)
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({
    task: "",
    deadline: "",
    status: "",
    description: "",
  })

  const [createTask] = useCreateTaskMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        userID: state.User.id,
        body: {
          ...data,
          status: false,
        },
      });
      setData({
        task: '',
        deadline: '',
        status: false,
        description: '',
      });
      setIsOpen(!isOpen);
    } catch (err) {
      console.log('could not create task', err);
    }
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center text-4xl font-bold cursor-pointer">
        +
      </div>

      {/* <!-- Main modal --> */}
      <form onSubmit={handleSubmit} id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed overlay top-0 left-0 right-0 z-50 ${!isOpen && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create Task
                </h3>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <InputField value={data.task} onChange={handleInput} label="Name of Task" name="task" placeholder="Add task name here" type="text" />
                <InputField value={data.description} onChange={handleInput} label="Task Description" name="description" placeholder="Add Task Description" type="text" />
                <InputField value={data.deadline} onChange={handleInput} label="Deadline" name="deadline" placeholder="Select a Deadline" type="date" />
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Task</button>
                <button onClick={() => setIsOpen(!isOpen)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddTask
