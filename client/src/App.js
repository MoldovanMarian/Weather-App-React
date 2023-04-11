import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import AppContent from "./components/AppContent";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState(null);
  const [city, setCity] = useState("");

  const handleCitySubmit = (city) => {
    setCity(city);
  };
  useEffect(() => {
    const fetchLocationAndTemperature = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `http://localhost:3000/weather?lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        setLocation(`${data.location.name}, ${data.location.region}`);
        setTemperature(data.current.temp_c);
        setIcon(data.current.condition.icon);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocationAndTemperature();
  }, []);

  return (
    <div className="app">
      {location && temperature && (
        <>
          <Header icon={icon} location={location} temperature={temperature} />
          <AppContent onButtonClick={handleCitySubmit} />
        </>
      )}
      {city && <Forecast city={city} />}
    </div>
  );
}

export default App;
