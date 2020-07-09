const reservationId = window.location.search.split("=")[1];
const flightNumberEl = document.getElementById("flight");
const seatNumberEl = document.getElementById("seat");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");

const infoPopulator = async () => {
  const response = await fetch(`/users/${reservationId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  flightNumberEl.innerText = user.flight;
  seatNumberEl.innerText = user.seat;
  nameEl.innerText = `${user.givenName} ${user.surName}`;
  emailEl.innerText = user.email;
};

infoPopulator();
