const currentLocation = document.getElementById("currentLocation");
const currentTime = document.getElementById("currentTime");
const currentTemp = document.getElementById("currentTemp");

const conditionText = document.getElementById("conditionText");

fetch(
  "https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=charleston",
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    currentLocation.textContent = response.location.name;
    currentTime.textContent = response.location.localtime;
    currentTemp.textContent = response.current.temp_f + " °" + "F";
    conditionText.textContent = response.current.condition.text;
  });
