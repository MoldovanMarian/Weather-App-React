import React, { useEffect, useState } from "react";

import Card from "./UI/Card";
import classes from "./Forecast.module.css";

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (city) {
      fetch(`http://localhost:3000/forecast/${city}`)
        .then((response) => response.json())
        .then((data) => {
          setForecast(data.forecast.forecastday);
        })
        .catch((error) => console.error(error));
    }
  }, [city]);

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { weekday: "long" });
  };

  return (
    <Card className={classes.forecast}>
      <div className={classes.forecastContent}>
        {forecast.map((day) => (
          <div className={classes.item} key={day.date}>
            <div className={classes.itemDate}>
              <h2>{getDayName(day.date)}</h2>
            </div>
            <div className={classes.itemImg}>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
            </div>
            <div className={classes.itemContent}>
              <div className={classes.itemMaxtemp}>
                <p>{day.day.maxtemp_c.toFixed()}°C</p>
              </div>
              <div className={classes.itemMintemp}>
                <p>{day.day.mintemp_c.toFixed()}°C</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Forecast;
