import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
export default function App() {
  let [cityName, setCityName] = useState("");
  let [msg, setMsg] = useState("");
  let [temp, setTemp] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [speed, setSpeed] = useState(null);
  let [description, setDescription] = useState(null);
  let [icon, setIcon] = useState(null);
  let [form, setForm] = useState(false);

  function displayTemp(response) {
    setTemp(response.data.main.temp);
    setSpeed(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setDescription(response.data.weather[0].description);
    //console.log(apiUrl);
    setForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "dc913128ccaa43cdc1ca63d7d482beef";
    let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
  }
  function updateCity(event) {
    event.preventDefault();
    setCityName(event.target.value);
  }
  let searchForm = (
    <form onSubmit={handleSubmit} className="mt-5 text-center">
      <input type="text" placeholder="Enter city name" onChange={updateCity} />
      <input type="submit" value="Search" className="btn btn-primary"/>
    </form>
  );
  if (form) {
    return (
      <div className="App ">
        {searchForm}
        <ul className="ulClass text-center mt-3">
          <li>Humidity: {humidity}%</li>
          <li>Temp: {temp}°C</li>
          <li>Description: {description}</li>
          <li>Wind: {speed} km/h</li>
          <li>
            <img src={icon} alt="icon" />
          </li>
        </ul>
        <p>
          <a
            href="https://github.com/zs44/React-weather-app-week4"
            className="link-info"
          >
            source code
          </a>{" "}
          by Zeinab Samadi{" "}
        </p>
      </div>
    );
  } else {
    return searchForm;
  }
}
