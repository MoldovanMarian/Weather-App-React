const express = require("express");
const cors = require("cors");
const fetch = require("isomorphic-fetch");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = "eb10bf54763b46748ee152230230604";

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Eroare la solicitarea API-ului.");
  }
});

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eb10bf54763b46748ee152230230604&q=${city}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/forecast/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=eb10bf54763b46748ee152230230604&q=${city}&days=7`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serverul ascultă la portul ${PORT}`);
});
