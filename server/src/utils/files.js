import fs from 'fs'

export const databaseName = "dataBase.json";

export function readDataFromFile(filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

export function writeDataToFile(filePath, data, callback) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}
