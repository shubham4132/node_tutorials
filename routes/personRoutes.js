const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//POST route to add a person
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:workType", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from  the URL parameter
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
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
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "person Deleted Successfully " });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
