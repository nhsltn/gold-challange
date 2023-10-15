const express = require("express");
const app = express();
const port = 3000 || process.env.port;
const routes = require("./routes/routes");
const ejs = require("ejs");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "ejs");

app.use("/", routes);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
