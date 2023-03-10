var APIKey = "f870f861932b4a0d394d100e06527d69"

var searchButton = $('#search-button');
var citySearch = $('#city-search');
var formEl = $('city-form');
var currentWeather = $('#current-weather');
var fiveDayContainer = $('#fiveDay');
var listContainer = $('#searchHistory');
var searchHistory = [];
var savedSearchRender = searchHistory;

var today = moment();
$("#current-date").text(today.format("MMM DD, YYYY"));


function getApi(cityName) {
    $('#current-weather').empty('');

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentWeather.append(`<h2>${data.name}</h2>`);
            currentWeather.append(`<p><img src="https://openweathermap.org/img/wn/${(data.weather[0].icon)}.png"></img></p>`);
            currentWeather.append(`<p>Temp: <span>${data.main.temp}°F</span></p>`);
            currentWeather.append(`<p>Wind: <span>${data.wind.speed}MPH</span></p>`);
            currentWeather.append(`<p>Humidity: <span>${data.main.humidity}%</span></p>`);

        });
}

function fiveDayForecast(cityName) {
    $('#fiveDay').empty('');

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(fiveDayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var fiveDayArray = data.list;
            console.log(fiveDayArray);

            for (var i = 2; i < fiveDayArray.length; i += 8) {

                var currentForecastIndex = fiveDayArray[i];
                fiveDayContainer.append(`<div class="col-2 border border-secondary m-1 text-white custom-card"><p>${moment(currentForecastIndex.dt_txt).format('MMM DD, YYYY')}</p><p><img src="https://openweathermap.org/img/wn/${(currentForecastIndex.weather[0].icon)}.png"></img></p><p>Temp: <span>${currentForecastIndex.main.temp}°F</span></p><p>Wind: <span>${currentForecastIndex.wind.speed}MPH</span></p><p>Humidity: <span>${currentForecastIndex.main.humidity}%</span></p></div>`);

            }
        })
}

function searchCity(currentCity) {

    $('#city-search').val('');
    console.log(currentCity)
    getApi(currentCity);
    fiveDayForecast(currentCity);
    setHistory(currentCity);
}

searchButton.on('click', function (event) {
    event.preventDefault()
    var currentCity = citySearch.val();
    console.log('City:', citySearch.val());
    searchCity(currentCity)
});

function setHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    renderHistory();

}

function getHistory() {
    var history = localStorage.getItem("cities");
    if (history) {
        searchHistory = JSON.parse(history);
    }
    renderHistory();
}

function renderHistory(){
    console.log(searchHistory)
    listContainer.empty();
    for (var i = searchHistory.length-1; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("history-btn");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        listContainer.append(btn);
    }
}

listContainer.on('click', function (event) {
    var target = event.target;
    console.log(target);
    var savedCity = target.innerHTML;
    console.log(savedCity);
    searchCity(savedCity)
})

getHistory();