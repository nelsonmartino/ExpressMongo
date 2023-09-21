const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("./models/User");
require("dotenv").config();
const app = express();
const port = 3001;
const { MONGODB_URI } = process.env;

app.use(express.json());

// create users
app.post("/create", (req, res) => {
  const userData = req.body;
  const newUser = userSchema(userData);
  newUser
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// Get all users
app.get("/", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// Get user by id
app.get("/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// Update user
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// Delete user
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`Listening on port ${port}`));
