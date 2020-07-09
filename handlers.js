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

const handleReservation = (req, res) => {
  // const { reservationId } = req.params;
  // const userObject = reservations.find((users) => {
  //   return users.id === reservationId;
  // });
  // res.send(userObject);
  res.send("yoooooo");
  // res.status(202).render("/public/seat-select/index.html");
};

const postUsers = (req, res) => {
  try {
    const data = req.body;
    data.id = uuidv4();
    reservations.push(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUsers = (req, res) => {
  const limit = req.query.limit;
  try {
    if (limit) {
      res.status(200).send(reservations.splice(0, limit));
    } else {
      res.status(200).send(reservations);
    }
  } catch (err) {
    res.status(404).send("not working");
  }
};

module.exports = {
  handleFlight,
  postUsers,
  getUsers,
  handleReservation,
};
