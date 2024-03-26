const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Import the router files
const personRoutes = require("./routes/personRoutes");
//use the routers
app.use("/", personRoutes);
app.listen(3000, () => {
  console.log("listening port 3000");
});
