import React from 'react'
import Card from '../components/Card'
import AddTask from '../components/AddTask'
import { nanoid } from 'nanoid'
import getUserTasks from './geGetUserTasks'

const Tasks = ({ userID }) => {
  const tasks = getUserTasks(userID);
  return (
    <div className='grid grid-cols-4 gap-4'>
      <AddTask />
      <Card />
      <div>
        <h2>Tasks for User {userID}</h2>
        {tasks}
      </div>
    </div>
  )
}

export default Tasks

