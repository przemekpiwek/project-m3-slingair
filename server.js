"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleFlight,
  handleSeatSelect,
  postUsers,
  getUsers,
  handleConfirm,
} = require("./handlers");

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
  .get("/seat-select", handleSeatSelect)
  .get(["/flights", "/flights/:flightNumber"], handleFlight)
  .get("/:reservationId", handleConfirm)
  .post("/users", postUsers)
  .get("/slingair/users?limit", getUsers)
  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
