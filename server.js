const express = require("express");
const cors = require("cors");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const host = process.env.HOST;
const static = require("./routes/static");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./database/connect");

// app.set("view engine", "ejs");
// app.set("layout", "./layouts/layout");

// app.use(expressLayouts);
// app.use(static);

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

// app.listen(port, () => {
//   console.log(`app listening on ${host}:${port}`);
// });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${host}:${port}`);
  }
});
