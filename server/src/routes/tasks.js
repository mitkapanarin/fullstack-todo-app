import express from "express";
import {
  readDataFromFile,
  writeDataToFile,
  databaseName,
} from "../utils/files.js";
import { nanoid } from "nanoid";
export const taskRouter = express.Router();

// get all tasks of 1 user
// get 1 task of 1 user
// create 1 task for 1 user
// update 1 taks for 1 user
// delete 1 task for 1 user

taskRouter.get("/all-tasks/:userID", (req, res) => {
  const { userID } = req.params;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.status(404).json({ message: "unable to access database" });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userID);
      if (user) {
        const tasks = user.tasks;
        res.status(200).json(tasks);
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    }
  });
});


taskRouter.get("/get-one-task/:userID/:taskID", (req, res) => {
  const { userID, taskID } = req.params;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.status(404).json({ message: "unable to access database" });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userID);
      if (user) {
        const task = user.tasks.find((item) => item.id === taskID);
        if (task) {
          res.status(200).json(task);
        } else {
          res.status(404).json({
            message: "task not found",
          });
        }
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    }
  });
});


taskRouter.post("/create-one-task/:userID", (req, res) => {
  const { userID } = req.params;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "database not accessible",
      });
    } else {
      const newData = JSON.parse(data).map((item) => {
        if (item.id === userID) {
          return {
            ...item,
            tasks: [...item.tasks, { ...req.body, id: nanoid() }],
          };
        } else {
          return item;
        }
      });
      writeDataToFile(databaseName, JSON.stringify(newData), (err) => {
        if (err) {
          res.status(404).json({
            message: "operation failed",
          });
        } else {
          res.status(201).json({
            message: "task created successfully under user",
          });
        }
      });
    }
  });
});

taskRouter.delete("/delete-task/:userID/:taskID", (req, res)=>{
  const {userID, taskID} = req.params;
  readDataFromFile(databaseName, (err, data)=>{
    if(err){
      res.status(404).json({
        message: "unable to access database",
      });
    }else{
      const users = JSON.parse(data);
      const userIndex = users.findIndex((item) => item.id === userID);
      if (userIndex === -1){
        res.status(404).json({ message: "User not found" });
      } else {
        const tasks = users[userIndex].tasks;
        const filteredTasks = tasks.filter((item) => item.id !== taskID);
        if (tasks.length === filteredTasks.length){
          res.status(404).json({ message: "Task not found" });
        } else {
          users[userIndex].tasks = filteredTasks;
          writeDataToFile(databaseName, JSON.stringify(users), (err) => {
            if (err) {
              res.status(500).json({ message: "Unable to delete task" });
            } else {
              res.status(204).json({ message: "Task deleted successfully" });
            }
          });
        }
      }
    }
  })
});

taskRouter.patch("/update-task/:userID/:taskID", (req, res) => {
  const { userID, taskID } = req.params;
  const { task, due, status } = req.body;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.status(404).json({
        message: "unable to access database",
      });
    } else {
      const users = JSON.parse(data);
      const userIndex = users.findIndex((item) => item.id === userID);
      if (userIndex === -1) {
        res.status(404).json({ message: "User not found" });
      } else {
        const tasks = users[userIndex].tasks;
        const taskIndex = tasks.findIndex((item) => item.id === taskID);
        if (taskIndex === -1) {
          res.status(404).json({ message: "Task not found" });
        } else {
          users[userIndex].tasks[taskIndex].task = task || users[userIndex].tasks[taskIndex].task;
          users[userIndex].tasks[taskIndex].due = due || users[userIndex].tasks[taskIndex].due;
          users[userIndex].tasks[taskIndex].status = status || users[userIndex].tasks[taskIndex].status;

          writeDataToFile(databaseName, JSON.stringify(users), (err) => {
            if (err) {
              res.status(500).json({ message: "Unable to update task" });
            } else {
              res.status(200).json({ message: "Task updated successfully" });
            }
          });
        }
      }
    }
  });
});



