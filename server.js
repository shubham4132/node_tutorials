const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
app.get("/", (req, res) => {
  res.send("hello world");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
//use the routers
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening port 3000");
});
