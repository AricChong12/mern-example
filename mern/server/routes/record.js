//import express lib
import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  //waits for the db connection, its collection named records
  let results = await collection.find({}).toArray();
  //no filter the data -> get all documents, returns a cursor and converts the cursor into an array of data
  res.send(results).status(200);
  //send the data back to the client
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  //waits for the db connection, its collection named records
  let query = { _id: new ObjectId(req.params.id) };
  //query the db with the id and converts it into ObjectId as mongodb stores _id as ObjectId
  let result = await collection.findOne(query);

  //if no result send network error 404 if got result send status 200
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    //create a new object using data sent from client (req.body)
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    // Access the "records" collection from MongoDB
    let collection = await db.collection("records");
    // Insert the new document into the database
    let result = await collection.insertOne(newDocument);
    // Send response back to client
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    // Log error in server console, if any
    res.status(500).send("Error adding record");
    // Send error response to client
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    // Create a query to find the document by its MongoDB _id
    const query = { _id: new ObjectId(req.params.id) };
    // Define the fields to update using MongoDB's $set operator
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    // Access the "records" collection
    let collection = await db.collection("records");
    // Update ONE document that matches the query
    let result = await collection.updateOne(query, updates);
    //send status of 200
    res.send(result).status(200);
  } catch (err) {
     // Log error in server console if any exists
    console.error(err);
    // Send error response to client
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    //query for the id in the mongodb
    const query = { _id: new ObjectId(req.params.id) };

    //access records collection
    const collection = db.collection("records");
    //delete the one record
    let result = await collection.deleteOne(query);
    //send 200 to client
    res.send(result).status(200);
  } catch (err) {
    //log any errors if exist
    console.error(err);
    //send 500 to client
    res.status(500).send("Error deleting record");
  }
});

//exports router  
export default router;