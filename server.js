"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { handleFlight, postUsers, getUserRes } = require("./handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get(["/flights", "/flights/:flightNumber"], handleFlight)
  .get("/users/:reservation", getUserRes)
  .post("/users", postUsers)
  .use("*", (req, res) =>
    res.status(404).send("Sorry, Can't find what you're looking for.")
  )
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
