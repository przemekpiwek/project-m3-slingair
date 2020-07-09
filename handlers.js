const { v4: uuidv4 } = require("uuid");

const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  if (!flightNumber) {
    res.send(allFlights);
  } else {
    try {
      res.status(200).send(flights[flightNumber]);
    } catch (err) {
      res.status(404).send("Sorry, this flight does not exist");
    }
  }
};

const postUsers = (req, res) => {
  try {
    const data = req.body;
    data.id = uuidv4();
    reservations.push(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserRes = (req, res) => {
  try {
    const { reservation } = req.params;
    const userObject = reservations.find((res) => res.id === reservation);
    res.status(200).json(userObject);
  } catch (err) {
    res.status(404).send("not working");
  }
};

module.exports = {
  handleFlight,
  postUsers,
  getUserRes,
};
