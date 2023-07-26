const currentLocationName = document.getElementById("currentLocationName");
const currentTime = document.getElementById("currentTime");
const currentTemp = document.getElementById("currentTemp");
const conditionText = document.getElementById("conditionText");
const conditionIcon = document.getElementById("conditionIcon");
const newSearchBtn = document.getElementById("searchBtn");
const tempTglBtn = document.getElementById("tempTglBtn");

async function getCurrentWeather() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=charleston"
  );
  const weatherData = await response.json();
  currentLocationName.textContent = weatherData.location.name;
  currentTime.textContent = weatherData.location.localtime;
  currentTemp.textContent = weatherData.current.temp_f + " °" + "F";
  tempTglBtn.addEventListener("click", tempTgl);
  conditionText.textContent = weatherData.current.condition.text;
  conditionIcon.src = `https://${weatherData.current.condition.icon.substr(2)}`;
}

const getCurrentForecast = async () => {
  try {
    // Get forecast data from API
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=c844ab4c783949409df230416231307&q=charleston&days=5&aqi=no&alerts=no"
    );
    const weatherForecastData = await response.json();
    console.log(weatherForecastData);

    for (let i = 0; i < weatherForecastData.forecast.forecastday.length; i++) {
      const forecastArray = weatherForecastData.forecast.forecastday;
      // Create elements for forecast card and give class names
      const forecastDisplay = document.getElementById("forecastDisplay");
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecastCard");
      const forecastDay = document.createElement("div");
      forecastDay.classList.add("forecastDay");
      const forecastIcon = document.createElement("img");
      forecastIcon.classList.add("forecastIcon");
      const forecastHighTemp = document.createElement("div");
      forecastHighTemp.classList.add("forecastHighTemp");
      const forecastLowTemp = document.createElement("div");
      forecastLowTemp.classList.add("forecastLowTemp");
      const forecastPrecipitation = document.createElement("div");
      forecastPrecipitation.classList.add("forecastPrecipitation");

      // Display day, icon, temps, and precip %
      let unixTimeStamp = forecastArray[i].date_epoch;
      let date = new Date(unixTimeStamp * 1000);
      forecastDay.textContent = date.toString().slice(0, 3);
      forecastIcon.src = `https://${forecastArray[i].day.condition.icon.substr(
        2
      )}`;
      forecastHighTemp.textContent = `${forecastArray[i].day.maxtemp_f} °F`;
      forecastLowTemp.textContent = `${forecastArray[i].day.mintemp_f} °F`;
      forecastPrecipitation.textContent = `${forecastArray[i].day.daily_chance_of_rain}% chance of rain`;

      // Append elements
      forecastDisplay.append(forecastCard);
      forecastCard.append(forecastDay);
      forecastCard.append(forecastIcon);
      forecastCard.append(forecastHighTemp);
      forecastCard.append(forecastLowTemp);
      forecastCard.append(forecastPrecipitation);
    }
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Something went wrong. Please enter a valid city. ";
  }
};

const searchNewWeather = () => {
  const searchBar = document.getElementById("searchBar");
  fetchNewWeather(searchBar.value);
  fetchNewForecast(searchBar.value);
};

const fetchNewWeather = async (_) => {
  removeErrorMessage();
  const searchBar = document.getElementById("searchBar");
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=${searchBar.value}`
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
  }
};

const fetchNewForecast = async (_) => {
  try {
    const searchBar = document.getElementById("searchBar");
    removePreviousForecast();

    // Get forecast data from API
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c844ab4c783949409df230416231307&q=${searchBar.value}&days=5&aqi=no&alerts=no`
    );
    const weatherForecastData = await response.json();
    console.log(weatherForecastData);

    for (let i = 0; i < weatherForecastData.forecast.forecastday.length; i++) {
      const forecastArray = weatherForecastData.forecast.forecastday;
      // Create elements for forecast card and give class names
      const forecastDisplay = document.getElementById("forecastDisplay");
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecastCard");
      const forecastDay = document.createElement("div");
      forecastDay.classList.add("forecastDay");
      const forecastIcon = document.createElement("img");
      forecastIcon.classList.add("forecastIcon");
      const forecastHighTemp = document.createElement("div");
      forecastHighTemp.classList.add("forecastHighTemp");
      const forecastLowTemp = document.createElement("div");
      forecastLowTemp.classList.add("forecastLowTemp");
      const forecastPrecipitation = document.createElement("div");
      forecastPrecipitation.classList.add("forecastPrecipitation");

      // Display day, icon, temps, and precip %
      let unixTimeStamp = forecastArray[i].date_epoch;
      let date = new Date(unixTimeStamp * 1000);
      forecastDay.textContent = date.toString().slice(0, 3);
      forecastIcon.src = `https://${forecastArray[i].day.condition.icon.substr(
        2
      )}`;
      forecastHighTemp.textContent = `${forecastArray[i].day.maxtemp_f} °F`;
      forecastLowTemp.textContent = `${forecastArray[i].day.mintemp_f} °F`;
      forecastPrecipitation.textContent = `${forecastArray[i].day.daily_chance_of_rain}% chance of rain`;

      // Append elements
      forecastDisplay.append(forecastCard);
      forecastCard.append(forecastDay);
      forecastCard.append(forecastIcon);
      forecastCard.append(forecastHighTemp);
      forecastCard.append(forecastLowTemp);
      forecastCard.append(forecastPrecipitation);
    }
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Something went wrong. Please enter a valid city. ";
  }
};

const removeErrorMessage = () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";
};

const removePreviousForecast = () => {
  let forecastDisplay = document.getElementById("forecastDisplay");
  while (forecastDisplay.firstChild) {
    forecastDisplay.removeChild(forecastDisplay.firstChild);
  }
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
getCurrentWeather();
getCurrentForecast();
newSearchBtn.addEventListener("click", fetchNewWeather);
newSearchBtn.addEventListener("click", fetchNewForecast);
