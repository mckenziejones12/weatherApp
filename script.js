const currentLocationName = document.getElementById("currentLocationName");
const currentTime = document.getElementById("currentTime");
const currentTemp = document.getElementById("currentTemp");
const conditionText = document.getElementById("conditionText");
const conditionIcon = document.getElementById("conditionIcon");
const newSearchBtn = document.getElementById("searchBtn");
const tempTglBtn = document.getElementById("tempTglBtn");

async function getWeather() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=charleston",
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  currentLocationName.textContent = weatherData.location.name;
  currentTime.textContent = weatherData.location.localtime;
  currentTemp.textContent = weatherData.current.temp_f + " °" + "F";
  tempTglBtn.addEventListener("click", tempTgl);
  conditionText.textContent = weatherData.current.condition.text;
  conditionIcon.src = `https://${weatherData.current.condition.icon.substr(2)}`;
}

const searchNewWeather = () => {
  const searchBar = document.getElementById("searchBar");
  fetchNewWeather(searchBar.value);
};

const fetchNewWeather = async (_) => {
  removeErrorMessage();
  const searchBar = document.getElementById("searchBar");
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=${searchBar.value}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    currentLocationName.textContent = weatherData.location.name;
    currentTime.textContent = weatherData.location.localtime;
    currentTemp.textContent = weatherData.current.temp_f + " °" + "F";
    conditionText.textContent = weatherData.current.condition.text;
    conditionIcon.src = `https://${weatherData.current.condition.icon.substr(
      2
    )}`;
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Something went wrong. Please enter a valid city. ";
    console.log(error);
  }
};

// const getForecastWeather = async () => {
//   try {
//     const response = await fetch(
//       "http://api.weatherapi.com/v1/forecast.json?key=c844ab4c783949409df230416231307&q=London&days=&aqi=no&alerts=no",
//       { mode: "no-cors" }
//     );
//     const weatherForecastData = await response.json();
//     console.log(weatherForecastData);
//   } catch (error) {
//     debugger;
//   }
// };

const removeErrorMessage = () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";
};

const tempTgl = async (_) => {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=charleston",
    { mode: "cors" }
  );
  const weatherData = await response.json();

  if (currentTemp.textContent == weatherData.current.temp_f + " °" + "F") {
    currentTemp.textContent = weatherData.current.temp_c + " °" + "C";
    tempTglBtn.value = "°F";
  } else if (
    currentTemp.textContent ==
    weatherData.current.temp_c + " °" + "C"
  ) {
    currentTemp.textContent = weatherData.current.temp_f + " °" + "F";
    tempTglBtn.value = "°C";
  }
};

// Add event listener and call functions
getWeather();
// getForecastWeather();
newSearchBtn.addEventListener("click", fetchNewWeather);
