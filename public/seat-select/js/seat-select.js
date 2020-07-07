const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const flightSelectDOM = document.getElementById("flight");

let selection = "";

const renderSeats = () => {
  document.querySelector(".form-container").style.display = "block";

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      seat.innerHTML = seatAvailable;
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = async (event) => {
  if (event) {
    const flightValue = event.target.value;
    const seats = await fetch(`/flights/${flightValue}`, {
      method: "GET",
    });
    const seatList = await seats.json();
    renderSeats(seatList);
  }
  const response = await fetch("/flights", {
    method: "GET",
  });
  const flights = await response.json();
  const nodeList = flightSelectDOM.childNodes;
  if (flights.length !== nodeList.length) {
    for (let i = 0; i < flights.length; i++) {
      let option = document.createElement("option");
      option.value = flights[i];
      option.innerHTML = flights[i];
      flightSelectDOM.appendChild(option);
    }
  }

  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
  renderSeats();
};

const handleConfirmSeat = async (event) => {
  event.preventDefault();
  // TODO: everything in here!
  const response = await fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      flight: document.getElementById("flight").value,
      seat: document.getElementById("seat-number").innerText,
      givenName: document.getElementById("givenName").value,
      surName: document.getElementById("surname").value,
      email: document.getElementById("email").value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  //from response, redirect to url with jquery reservationid from response
};

toggleFormContent();

flightInput.addEventListener("change", toggleFormContent);
