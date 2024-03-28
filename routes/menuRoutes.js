const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:tastes", async (req, res) => {
  try {
    const tastes = req.params.tastes;
    if (tastes == "Spicy" || tastes == "Sour" || tastes == "Sweet") {
      const response = await MenuItem.find({ taste: tastes });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //Extract the id from  the URL parameter
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    // Send the updated person data as a JSON response

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "Menu Deleted Successfully " });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
