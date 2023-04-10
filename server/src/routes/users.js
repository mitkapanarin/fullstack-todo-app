import express from "express";
import { readDataFromFile, writeDataToFile } from "../utils/files.js";
import {nanoid} from "nanoid";

const databaseName = "dataBase.json";
export const UserRouter = express.Router();

// create-users
// delete-users
// update-users
// get-one-user
// get-all-users

UserRouter.post("/create-users", (req, res) => {
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({
        message: "unable to access database",
      });
    } else {
      const newData = [...JSON.parse(data), { ...req.body, id: nanoid() }];
      writeDataToFile(databaseName, JSON.stringify(newData), (err) => {
        if (err) {
          res.json({
            message: "cannot write data to database",
          });
        } else {
          res.json(newData)
        }
      });
    }
  });
});
UserRouter.delete("/delete-users/:id", (req, res) => {
  const {id} = req.params

  readDataFromFile
});
UserRouter.patch("/update-users", (req, res) => {});
UserRouter.get("/get-one-user", (req, res) => {});
UserRouter.get("/get-all-users", (req, res) => {
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({
        message: "unable to access database",
      });
    } else {
      res.json(JSON.parse(data));
    }
  });
});
