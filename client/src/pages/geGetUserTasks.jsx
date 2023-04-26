import React from 'react';
import { useGetAllTasksQuery } from '../store/API/tasksApi';

const getUserTasks = (userID) => {
  const { data, error, isLoading } = useGetAllTasksQuery({ userID });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((task) => (
        <div key={task.id}>{task.title}
        console.log(task)
        </div>
        
      ))}
    </div>
  );
};

export default getUserTasks;
