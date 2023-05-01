import React from 'react'
import { useSelector } from 'react-redux'
import { useGetAllTasksQuery } from '../store/API/tasksApi'

const Home = () => {
  const state = useSelector(z => z)
  console.log(state.User.name)

  const { data } = useGetAllTasksQuery({ userID: state.User.id });

  const completed = data?.filter(item => item.status == true)
  const incomplete = data?.filter(item => item.status == false)

  const completedTasks = completed?.map(task => (
    <tr key={task.id}>
      <td className="border px-4 py-2">{task.task}</td>
      <td className="border px-4 py-2">{task.deadline}</td>
      <td className="border px-4 py-2">{task.description}</td><br/>
    </tr>
  ))

  const incompleteTasks = incomplete?.map(task => (
    <tr key={task.id}>
      <td className="border px-4 py-2">{task.task}</td>
      <td className="border px-4 py-2">{task.deadline}</td>
      <td className="border px-4 py-2">{task.description}</td>
    </tr>
  ))

  return (
    <div>
      <h1 className='text-center text-4xl'>Welcome {state.User.name} 👋</h1><br /><br />
      <div className="mx-auto">
        <h2 className='text-center text-2xl'>Completed Tasks:</h2>
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks}
          </tbody>
        </table>
        <br />
      </div>
      <div className="mx-auto">
        <h2 className='text-center text-2xl'>Incomplete Tasks:</h2>
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {incompleteTasks}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
