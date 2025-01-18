const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;

  MongoClient.connect(uri, {
    ssl: true,
  })
    .then((client) => {
      _db = client.db("cse");
      console.log("Connected to the 'cse' database.");
      callback(null, _db);
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
