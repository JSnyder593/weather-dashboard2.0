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

function searchCitySubmit(currentCity) {

    $('#city-search').val('');
    console.log(currentCity)
    getApi(currentCity);

}

searchButton.on('click', function (event) {
    event.preventDefault()
    var currentCity = citySearch.val();
    console.log('City:', citySearch.val());
    searchCitySubmit(currentCity)
});