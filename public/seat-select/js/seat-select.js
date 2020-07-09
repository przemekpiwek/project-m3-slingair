const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const flightSelectDOM = document.getElementById("flight");

let selection = "";

const renderSeats = (seats) => {
  while (seatsDiv.hasChildNodes()) {
    seatsDiv.removeChild(seatsDiv.lastChild);
  }
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
      let seatObject = seats.find((seat) => {
        return seat.id === seatNumber;
      });
      if (seatObject.isAvailable) {
        seat.innerHTML = seatAvailable;
        row.appendChild(seat);
      } else {
        seat.innerHTML = seatOccupied;
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
  }
};

const renderSelectDom = async () => {
  const response = await fetch("/flights", {
    method: "GET",
  });
  const flights = await response.json();
  if (!flightSelectDOM.hasChildNodes()) {
    for (let i = 0; i < flights.length; i++) {
      let option = document.createElement("option");
      option.value = flights[i];
      option.innerHTML = flights[i];
      flightSelectDOM.appendChild(option);
    }
  }
};
renderSelectDom();

const toggleFormContent = async (event) => {
  await renderSelectDom();
  let flightValue =
    flightSelectDOM.options[flightSelectDOM.selectedIndex].value;
  const seats = await fetch(`/flights/${flightValue}`, {
    method: "GET",
  });
  let seatJson = await seats.json();
  renderSeats(seatJson);
};
toggleFormContent();

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
  const json = await response.json();
  console.log(json.data.id);
  if (json.status === "success") {
    window.location = `/seat-select/confirmed.html?reservationId=${json.data.id}`;
  } else {
    console.log("error occurred");
  }
};

flightInput.addEventListener("change", toggleFormContent);
