const { v4: uuidv4 } = require("uuid");

const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  if (!flightNumber) {
    return res.json(allFlights);
  } else {
    try {
      return res.status(200).json(flights[flightNumber]);
    } catch (err) {
      return res.status(404).json("Sorry, this flight does not exist");
    }
  }
};

const handleSeatSelect = (req, res) => {
  //render the seat select UI and form submission
  res.status(202).render("/public/seat-select/index.html");
};

const postUsers = (req, res) => {
  const data = req.body;
  data.id = uuidv4();
  reservations.push(data);
  console.log(data);
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

const handleConfirm = (req, res) => {
  res.render();
};

module.exports = {
  handleFlight,
  handleSeatSelect,
  postUsers,
  getUsers,
  handleConfirm,
};
