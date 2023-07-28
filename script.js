const currentLocationName = document.getElementById("currentLocationName");
const currentTime = document.getElementById("currentTime");
const currentTemp = document.getElementById("currentTemp");
const conditionText = document.getElementById("conditionText");
const conditionIcon = document.getElementById("conditionIcon");
const newSearchBtn = document.getElementById("searchBtn");
const tempToggleBtn = document.getElementById("tempToggleBtn");

const getInitialWeather = async () => {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=c844ab4c783949409df230416231307&q=charleston"
  );
  const weatherData = await response.json();
  currentLocationName.textContent = weatherData.location.name;
  currentTime.textContent = weatherData.location.localtime;
  currentTemp.textContent = Math.round(weatherData.current.temp_f) + " °" + "F";
  tempToggleBtn.addEventListener("click", toggleTemp);
  conditionText.textContent = weatherData.current.condition.text;
  conditionIcon.src = `https://${weatherData.current.condition.icon.substr(2)}`;
};

const getInitialForecast = async () => {
  try {
    // Get forecast data from API
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=c844ab4c783949409df230416231307&q=charleston&days=5&aqi=no&alerts=no"
    );
    const weatherForecastData = await response.json();

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
      forecastHighTemp.textContent = `${Math.round(
        forecastArray[i].day.maxtemp_f
      )} °F`;
      forecastLowTemp.textContent = `${Math.round(
        forecastArray[i].day.mintemp_f
      )} °F`;
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
    currentTemp.textContent =
      Math.round(weatherData.current.temp_f) + " °" + "F";
    conditionText.textContent = weatherData.current.condition.text;
    conditionIcon.src = `https://${weatherData.current.condition.icon.substr(
      2
    )}`;
  } catch (error) {
    displayErrorMessage();
  }
};

const fetchNewForecast = async (_) => {
  removeErrorMessage();
  removePreviousForecast();
  const searchBar = document.getElementById("searchBar");
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c844ab4c783949409df230416231307&q=${searchBar.value}&days=5&aqi=no&alerts=no`
    );
    const weatherForecastData = await response.json();

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
      const date = new Date(unixTimeStamp * 1000);
      forecastDay.textContent = date.toString().slice(0, 3);
      forecastIcon.src = `https://${forecastArray[i].day.condition.icon.substr(
        2
      )}`;
      forecastHighTemp.textContent = `${Math.round(
        forecastArray[i].day.maxtemp_f
      )} °F`;
      forecastLowTemp.textContent = `${Math.round(
        forecastArray[i].day.mintemp_f
      )} °F`;
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
    displayErrorMessage();
  }
};

const removeErrorMessage = () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";
};

const displayErrorMessage = () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "block";
  errorMessage.textContent =
    "Something went wrong. Please enter a valid city. ";
};

const removePreviousForecast = () => {
  let forecastDisplay = document.getElementById("forecastDisplay");
  while (forecastDisplay.firstChild) {
    forecastDisplay.removeChild(forecastDisplay.firstChild);
  }
};

const celsiusToFahrenheight = (celsius) => celsius * 1.8 + 32;

const fahrenheightToCelsius = (fahrenheight) => (fahrenheight - 32) / 1.8;

const toggleTemp = (_) => {
  const isCurrentTempFahreneight = currentTemp.textContent.includes("F");
  const spaceIndex = currentTemp.textContent.indexOf(" ");
  const tempNumber = currentTemp.textContent.substr(0, spaceIndex);

  // Update current temps
  if (isCurrentTempFahreneight) {
    const newTemp = Math.round(fahrenheightToCelsius(parseFloat(tempNumber)));
    currentTemp.textContent = `${newTemp} °C`;
    tempToggleBtn.value = "°F";
  } else {
    const newTemp = Math.round(celsiusToFahrenheight(parseFloat(tempNumber)));
    currentTemp.textContent = `${newTemp} °F`;
    tempToggleBtn.value = "°C";
  }

  const highForecastTemps = document.getElementsByClassName("forecastHighTemp");
  const lowForecastTemps = document.getElementsByClassName("forecastLowTemp");

  // Update high forecast temps
  for (const highForecastTemp of highForecastTemps) {
    const isCurrentHighTempFahreneight =
      highForecastTemp.textContent.includes("F");
    const highTempSpaceIndex = highForecastTemp.textContent.indexOf(" ");
    const highTempNumber = highForecastTemp.textContent.substr(
      0,
      highTempSpaceIndex
    );

    if (isCurrentHighTempFahreneight) {
      const newHighTemp = Math.round(
        fahrenheightToCelsius(parseFloat(highTempNumber))
      );
      highForecastTemp.textContent = `${newHighTemp} °C`;
    } else {
      const newHighTemp = Math.round(
        celsiusToFahrenheight(parseFloat(highTempNumber))
      );
      highForecastTemp.textContent = `${newHighTemp} °F`;
    }
  }

  // Update low forecast temps
  for (const lowForecastTemp of lowForecastTemps) {
    const isCurrentLowTempFahreneight =
      lowForecastTemp.textContent.includes("F");
    const lowTempSpaceIndex = lowForecastTemp.textContent.indexOf(" ");
    const lowTempNumber = lowForecastTemp.textContent.substr(
      0,
      lowTempSpaceIndex
    );

    if (isCurrentLowTempFahreneight) {
      const newLowTemp = Math.round(
        fahrenheightToCelsius(parseFloat(lowTempNumber))
      );
      lowForecastTemp.textContent = `${newLowTemp} °C`;
    } else {
      const newLowTemp = Math.round(
        celsiusToFahrenheight(parseFloat(lowTempNumber))
      );
      lowForecastTemp.textContent = `${newLowTemp} °F`;
    }
  }
};

// Add event listener and call functions
getInitialWeather();
getInitialForecast();
newSearchBtn.addEventListener("click", fetchNewWeather);
newSearchBtn.addEventListener("click", fetchNewForecast);
