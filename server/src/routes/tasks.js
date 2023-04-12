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
});

taskRouter.get("/get-one-task/:userID/:taskID", (req, res) => {
  const { userID, taskID } = req.params;
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
          return { ...item, tasks: [...item.tasks,{ ...req.body, id: nanoid() }] };
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
