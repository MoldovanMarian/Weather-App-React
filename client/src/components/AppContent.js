import React, { useState } from "react";

import Card from "./UI/Card";
import classes from "./AppContent.module.css";

const AppContent = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/weather/${city}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        props.onButtonClick(city);
      })
      .catch((error) => console.error(error));

    setCity("");
  };

  const handleButtonClick = () => {
    props.onButtonClick({ city });
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Card className={classes.container}>
      <div className={classes.formContainer}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="city">Enter the city name:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleButtonClick}>
            Search
          </button>
        </form>
      </div>

      {weatherData && (
        <div className={classes.containerResults}>
          <div className={classes.itemImg}>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
          </div>
          <div className={classes.cityTemp}>
            <div className={classes.texttx}>{weatherData.location.name}</div>
            <div className={classes.texttx}>
              {weatherData.current.temp_c.toFixed()} °C
            </div>
          </div>
          <div className={classes.anotherDet}>
            <div className={classes.text}>
              {weatherData.current.condition.text}
            </div>
            <div className={classes.text}>
              Feels like: {weatherData.current.feelslike_c.toFixed()} °C
            </div>
          </div>
          <div className={classes.anotherDet2}>
            <div className={classes.text}>
              Wind: {weatherData.current.wind_kph.toFixed()} km/h
            </div>
            <div className={classes.text}>
              Humidity: {weatherData.current.humidity}%
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AppContent;
