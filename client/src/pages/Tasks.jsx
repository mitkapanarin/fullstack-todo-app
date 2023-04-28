import React from 'react'
import Card from '../components/Card'
import AddTask from '../components/AddTask'
import { nanoid } from 'nanoid'
import { useGetAllTasksQuery } from '../store/API/tasksApi'
import { useSelector } from 'react-redux'

const Tasks = () => {
  const store = useSelector(x=>x)
  // console.log(store.User.id)
  const {data} = useGetAllTasksQuery({userID:store.User.id});
  console.log(data)
  return (
    <div className='grid grid-cols-4 gap-4'>
      <AddTask />
      {data?.map(item=> <Card id={item.id} {...item}/>)}
    </div>
  )
}

export default Tasks

