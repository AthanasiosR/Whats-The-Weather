import React, { useState } from "react";
import { format, getDayOfYear } from "date-fns";
// import NotFound from "./components/NotFound";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      Promise.all([
        fetch(
          `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
        ).then((res) => res.json()),
        fetch(
          `${api.base}forecast?q=${query}&units=metric&cnt=20&appid=${api.key}`
        ).then((res) => res.json()),
      ]).then((result) => {
        const [weatherResult, forecastResult] = result;
        const { weather, main, dt, sys, id, name } = weatherResult;
        setWeather({ weather, main, dt, sys, id, name });
        setQuery(query);
        console.log(result);
        const { list } = forecastResult;
        setForecast(list);
      });
    }
  };

  // const futureForecast = (evt) => {
  //   if (evt.key === "Enter") {
  //     fetch(
  //       `${api.base}forecast?q=${query}&units=metric&cnt=10&appid=${api.key}`
  //     )
  //       .then((res) => res.json())
  //       .then((resultTwo) => {
  //         setWeather(resultTwo);
  //         setQuery(query);
  //         console.log(resultTwo);
  //       });
  //   }
  // };

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

  const groupedForecast = {};

  for (let dt of forecast) {
    const dayOfYear = getDayOfYear(dt.dt * 1000);
    if (groupedForecast[dayOfYear] === undefined) {
      groupedForecast[dayOfYear] = [];
    }
    groupedForecast[dayOfYear].push(dt);
  }
  console.log(groupedForecast);

  const groups = Object.entries(groupedForecast)
    .sort(([keyA, valueA], [keyB, valueB]) => {
      return keyA - keyB;
    })
    .map(([key, value]) => value);

  console.log(groups);

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                <h3>Feels Like: {Math.round(weather.main.feels_like)}°c</h3>
                <h3>
                  {" "}
                  {/* {weather.weather[0].icon} */}
                  {weather.weather[0].description}
                </h3>
              </div>
              {/* <div className="feels-like"></div>
              <div className="weather"></div> */}
              <div className="extra">
                <div>High: {Math.round(weather.main.temp_max)}°c</div>
                <div>Low: {Math.round(weather.main.temp_min)}°c</div>
                <div>Humidity: {weather.main.humidity}%</div>
                {/* <div>
                  sunrise: {weather.sys.sunrise}
                  sunset: {weather.sys.sunset}
                </div> */}
              </div>
            </div>
            <div className="forecast-box">
              <h1>FORECAST</h1>
              {groups.map((group) => {
                return (
                  <>
                    <div className="future-weather">
                      {format(group[0].dt * 1000, "MMMM do")}
                    </div>
                    <ul className="forecast-day">
                      {group.map((hour) => {
                        return (
                          <li>
                            <div className="forecast-info">
                              {format(hour.dt * 1000, "HH:mm")}
                            </div>
                            <div className="forecast-info">
                              {Math.round(hour.main.temp)}
                            </div>
                            <div className="forecast-info">
                              Feels Like: {Math.round(hour.main.feels_like)}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
