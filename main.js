const api = {
  appid: "3ee29406978e627cfa1301590775da90",
  baseurl: "http://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search-box");

const setQuery = (e) => {
  if (e.keyCode == 13) {
    getResults(search.value);
  }
};
search.addEventListener("keypress", setQuery);

const getResults = (userInput) => {
  fetch(`${api.baseurl}weather?q=${userInput}&units=metric&APPID=${api.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
};

const displayResults = (weather) => {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name} ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>&degC</span>`;

  const weather_el = document.querySelector(".weather");
  weather_el.innerText = weather.weather[0].main;
  if (weather.weather[0].main.value == "Clear") {
    document.getElementsByTagName(body).style.backgroundColor = "red";
  }

  const hi_low = document.querySelector(".hi-low");
  hi_low.innerHTML = `${Math.round(
    weather.main.temp_min
  )}<span>&degC</span>/ ${Math.round(weather.main.temp_max)}<span>&degC</span>`;
};

// Generates date which is then passed unto the date selector
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
