const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const host = process.env.HOST;
const static = require("./routes/static");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

app.use(expressLayouts);
app.use(static);

app.get("/", require("./routes"));

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
