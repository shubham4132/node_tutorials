const express = require("express");
const router = express.Router();
//POST route to add a person
router.post("/person", async (req, res) => {
  // const data = req.body; //Assuming the request body contains the person data
  // //create a new Person document using the Mongoose model
  // const newPerson = new Person(data);
  // newPerson.save((error, savedPerson) => {
  //   if (error) {
  //     console.log("Error savig person", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   } else {
  //     console.log("data saved succesfully");
  //     res.status(200).json(savedPerson);
  //   }
  // });
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//GET METHOD TO GET THE PERSON
router.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/person/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work Type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
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
module.exports = router;
