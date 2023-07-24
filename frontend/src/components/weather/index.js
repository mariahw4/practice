import React from 'react';
import DayJS from 'react-dayjs';
import './style.css';

 function Weather() {
 
 // Global variables
 var cityList = [];
 var cityName;
 
 // local storage functions
 initCityList();
 initWeather();
 
 // This function displays the city entered by the user into the DOM
 function renderCities(){
    var listOfCities = document.getElementById("list-of-cities");
    var cityNameInput = document.getElementById("city-name");

  listOfCities = "";
  cityNameInput.value = "";
     
  for (var i = 0; i < cityList.length; i++) {
    var a = document.createElement("a");
    a.classList.add("list-group-item", "list-group-item-action", "list-group-item-primary", "city");
    a.setAttribute("data-name", cityList[i]);
    a.textContent = cityList[i];
    listOfCities.insertBefore(a, listOfCities.firstChild);
  }
 }
 // This function pulls the city list array from local storage
 function initCityList() {
     var storedCities = JSON.parse(localStorage.getItem("cities"));
     
     if (storedCities !== null) {
         cityList = storedCities;
     }
     
     renderCities();
     }
 // This function pull the current city into local storage to display the current weather forecast on reload
 function initWeather() {
     var storedWeather = JSON.parse(localStorage.getItem("currentCity"));
 
     if (storedWeather !== null) {
         cityName = storedWeather;
 
         displayWeather();
         displayFiveDayForecast();
     }
 }
 
 // This function saves the city array to local storage
 function storeCityArray() {
     localStorage.setItem("cities", JSON.stringify(cityList));
     }
 
 // This function saves the currently displayed city to local storage
 function storeCurrentCity() {
 
     localStorage.setItem("currentCity", JSON.stringify(cityName));
 }
       
 // Click event handler for city search button
document.querySelector(".search-btn").addEventListener("click", function(event) {
    event.preventDefault();
  
    var cityName = document.getElementById("city-name").value.trim();
    if (cityName === "") {
      alert("Please enter a city to look up");
    } else if (cityList.length >= 6) {
      cityList.shift();
      cityList.push(cityName);
    } else {
      cityList.push(cityName);
    }
  
    storeCurrentCity();
    storeCityArray();
    renderCities();
    displayWeather();
    displayFiveDayForecast();
  });
  
  // Event handler if the user hits enter after entering the city search term instead of clicking search
  document.getElementById("city-name").addEventListener("keypress", function(e) {
    if (e.which === 13) {
      document.querySelector(".search-btn").click();
    }
  });
  
 
 // This function runs the Open Weather async API AJAX call and displays the current city, weather, and 5 day forecast to the DOM once requested
 async function displayWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=5b4735245dfd66f5f4d0cf9ad8b7706a";
  
    var response = await fetch(queryURL);
    var data = await response.json();
    console.log(data);
  
    var currentWeatherDiv = document.createElement("section");
    currentWeatherDiv.className = "city-data current-weather";
  
    var getCurrentCity = data.name;
    var val = DayJS().format('MM/DD/YYYY');
    var getCurrentWeatherIcon = data.weather[0].icon;
    var displayCurrentWeatherIcon = document.createElement("img");
    displayCurrentWeatherIcon.src = "https://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png";
  
    var currentCityEl = document.createElement("h4");
    currentCityEl.className = "card-body";
    currentCityEl.textContent = getCurrentCity + " (" + val + ")";
    currentCityEl.appendChild(displayCurrentWeatherIcon);
    currentWeatherDiv.appendChild(currentCityEl);
  
    var getTemp = data.main.temp.toFixed(1);
    var tempEl = document.createElement("p");
    tempEl.className = "card-text";
    tempEl.textContent = "Temperature: " + getTemp + "° F";
    currentWeatherDiv.appendChild(tempEl);
  
    var getHumidity = data.main.humidity;
    var humidityEl = document.createElement("p");
    humidityEl.className = "card-text";
    humidityEl.textContent = "Humidity: " + getHumidity + "%";
    currentWeatherDiv.appendChild(humidityEl);
  
    var getWindSpeed = data.wind.speed.toFixed(1);
    var windSpeedEl = document.createElement("p");
    windSpeedEl.className = "card-text";
    windSpeedEl.textContent = "Wind Speed: " + getWindSpeed + " mph";
    currentWeatherDiv.appendChild(windSpeedEl);
  
    var cityDataContainer = document.querySelector(".city-data");
    cityDataContainer.innerHTML = ""; // Clear existing data
    cityDataContainer.appendChild(currentWeatherDiv);
  }
  
 
 // This function runs the AJAX call for the 5 day forecast and displays them to the DOM
 async function displayFiveDayForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=5b4735245dfd66f5f4d0cf9ad8b7706a";
  
    var response = await fetch(queryURL);
    var data = await response.json();
    console.log(data);
  
    var forecastDiv = document.createElement("section");
    forecastDiv.className = "display-forecast";
  
    var forecastHeader = document.createElement("h3");
    forecastHeader.className = "card-header border-secondary";
    forecastHeader.textContent = "5 Day Forecast:";
    forecastDiv.appendChild(forecastHeader);
  
    var fiveDayCardContainer = document.createElement("div");
    fiveDayCardContainer.className = "card-deck";
    forecastDiv.appendChild(fiveDayCardContainer);
  
    for (var i = 0; i < 5; i++) {
      var forecastCard = document.createElement("div");
      forecastCard.className = "cards mb-3 mt-3";
  
      var cardEachFiveDay = document.createElement("div");
      cardEachFiveDay.className = "card-body";
  
      var val = DayJS().add(i, "day").format("MM/DD/YYYY");
      var forecastDate = document.createElement("h6");
      forecastDate.className = "card-title";
      forecastDate.textContent = val;
      cardEachFiveDay.appendChild(forecastDate);
  
      var getCurrentWeatherIcon = data.list[i].weather[0].icon;
      var displayWeatherIcon = document.createElement("img");
      displayWeatherIcon.src = "https://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png";
      cardEachFiveDay.appendChild(displayWeatherIcon);
  
      var getTemp = data.list[i].main.temp;
      var tempEl = document.createElement("p");
      tempEl.className = "card-text";
      tempEl.textContent = "Temp: " + getTemp + "° F";
      cardEachFiveDay.appendChild(tempEl);
  
      var getHumidity = data.list[i].main.humidity;
      var humidityEl = document.createElement("p");
      humidityEl.className = "card-text";
      humidityEl.textContent = "Humidity: " + getHumidity + "%";
      cardEachFiveDay.appendChild(humidityEl);
  
      forecastCard.appendChild(cardEachFiveDay);
      fiveDayCardContainer.appendChild(forecastCard);
    }
  
    var forecastContainer = document.querySelector(".forecast-container");
    forecastContainer.innerHTML = ""; // Clear existing data
    forecastContainer.appendChild(forecastDiv);
  }
  
  // This function is used to pass the city in the history list to the displayWeather function
  function historyDisplayWeather() {
    cityName = this.getAttribute("data-name");
    displayWeather();
    displayFiveDayForecast();
    console.log(cityName);
  }
  
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("city")) {
      historyDisplayWeather.call(event.target);
    }
  });
  
 
return (
<>
    <header className="custom-header text-light px-4 py-2 mb-1">
      <div className="container text-center">
        <h1>Weather Dashboard</h1>
      </div>
    </header>

    <div className="container">
        <div className="row align-items-start">
          <section className="col-3">
            <div className="input-group mb-3 mt-3">
              <h4>Search for a City:</h4>
            </div>
            <div className="input-group mb-3">
              <input className="city-search form-control" id="city-name" type="text" placeholder="City Name"/>
            </div>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary search-btn" type="button" id="button-addon1">Search</button>
            </div>
              <hr/>
            <div className="results list-group city-results" id="list-of-cities"> </div>
          </section>

          <section className="col-9">
            <section className="city-data"></section>
            <section className="display-forecast">
                <div className="forecast-container"></div>
            </section>
          </section>
        </div>
    </div>



</>

 )
}

export default Weather;