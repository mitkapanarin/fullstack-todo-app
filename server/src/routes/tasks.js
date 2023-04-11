import express from "express";
import { readDataFromFile, writeDataToFile } from "../utils/files.js";
import { nanoid } from "nanoid";

const databaseName = "dataBase.json";
export const TaskRouter = express.Router();

// create-task
// delete-task
// update-task
// get-one-task
// get-all-tasks

TaskRouter.post("/create-task", (req, res) => {
  const userId = req.body.userId;
  const task = { ...req.body.task, id: nanoid() };
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({ message: "Unable to access database" });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userId);
      if (!user) {
        res.json({ message: "User not found" });
      } else {
        user.tasks.push(task);
        writeDataToFile(databaseName, JSON.stringify(users), (err) => {
          if (err) {
            res.json({ message: "Failed to create task" });
          } else {
            res.json(user);
          }
        });
      }
    }
  });
});

TaskRouter.delete("/delete-task/:userId/:taskId", (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({ message: "Unable to access database" });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userId);
      if (!user) {
        res.json({ message: "User not found" });
      } else {
        const oldTasks = user.tasks;
        const filteredTasks = oldTasks.filter((item) => item.id !== taskId);
        if (oldTasks.length === filteredTasks.length) {
          res.json({ message: "Task not found" });
        } else {
          user.tasks = filteredTasks;
          writeDataToFile(databaseName, JSON.stringify(users), (err) => {
            if (err) {
              res.json({ message: "Failed to delete task" });
            } else {
              res.json(user);
            }
          });
        }
      }
    }
  });
});

TaskRouter.put("/update-task/:userId/:taskId", (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  const newTask = req.body.task;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({ message: "Unable to access database" });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userId);
      if (!user) {
        res.json({ message: "User not found" });
      } else {
        const oldTasks = user.tasks;
        const index = oldTasks.findIndex((item) => item.id === taskId);
        if (index === -1) {
          res.json({ message: "Task not found" });
        } else {
          user.tasks[index] = { ...oldTasks[index], ...newTask };
          writeDataToFile(databaseName, JSON.stringify(users), (err) => {
            if (err) {
              res.json({ message: "Failed to update task" });
            } else {
              res.json(user);
            }
          });
        }
      }
    }
  });
});
