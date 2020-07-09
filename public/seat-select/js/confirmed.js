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
  if (user.status === "success") {
    flightNumberEl.innerText = user.userObject.flight;
    seatNumberEl.innerText = user.userObject.seat;
    nameEl.innerText = `${user.userObject.givenName} ${user.userObject.surName}`;
    emailEl.innerText = user.userObject.email;
  } else {
    console.log(user.status);
  }
};

infoPopulator();
