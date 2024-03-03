const express = require("express");
const app = express();
require("./database/connection");
app.use(express.json());
(bodyParser = require("body-parser")), (jsonwebtoken = require("jsonwebtoken"));
const userRoutes = require("./router/userRouter");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/api/users", userRoutes); // Assuming you want your routes to be under '/api/users'

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

module.exports = app;
