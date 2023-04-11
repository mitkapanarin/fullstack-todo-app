import express from "express";
import { readDataFromFile, writeDataToFile } from "../utils/files.js";
import { nanoid } from "nanoid";

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
          res.json(newData);
        }
      });
    }
  });
});

UserRouter.delete("/delete-users/:id", (req, res) => {
  const id = req.params.id;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({ message: "Unable to access database" });
    } else {
      const oldData = JSON.parse(data);
      const filteredData = oldData.filter((item) => item.id !== id);
      if (oldData.length === filteredData.length) {
        res.json({ message: "User not found" });
      } else {
        writeDataToFile(databaseName, JSON.stringify(filteredData), (err) => {
          if (err) {
            res.json({ message: "Failed to delete user" });
          } else {
            res.json({ message: "User deleted successfully" });
          }
        });
      }
    }
  });
});

UserRouter.get("/get-one-user/:id", (req, res) => {
  const userId = req.params.id;
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({
        message: "unable to access database",
      });
    } else {
      const users = JSON.parse(data);
      const user = users.find((item) => item.id === userId);
      if (user) {
        res.json(user);
      } else {
        res.json({
          message: "user not found",
        });
      }
    }
  });
});

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
