import express from "express";
import { readDataFromFile, writeDataToFile, databaseName } from "../utils/files.js";
import { nanoid } from "nanoid";

export const UserRouter = express.Router();

// create-users
// delete-users
// update-users
// get-one-user
// get-all-users

UserRouter.post("/create-users", (req, res) => {
  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.status(500).json({
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
          res.status(201).json(newData);
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
            res.status(204).json({ message: "User deleted successfully" });
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
        res.status(200).json(user);
      } else {
        res.status(404).json({
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
      res.status(200).json(JSON.parse(data));
    }
  });
});

UserRouter.put("/update-user/:id", (req, res) => {
  const { id } = req.params;

  readDataFromFile(databaseName, (err, data) => {
    if (err) {
      res.json({ message: "cant read database" });
    } else {
      const updatedData = JSON.parse(data).map((item) => {
        if (item.id === id) {
          return { ...item, ...req.body };
        } else {
          return item;
        }
      });

      writeDataToFile(databaseName, JSON.stringify(updatedData), (err)=>{
        if(err){
          res.json({ message: " can not update"})
        }
        else{
          res.json({
            message: "successfully updated user"
          })
        }
      })
    }
  });
});
