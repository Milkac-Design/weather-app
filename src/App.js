import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(' ');
  const [allData, setAllData] = useState({});
  const [mainData, setMainData] = useState({});
  const [weatherData, setWeatherData] = useState({});


  async function handleSubmit(e) {
    e.preventDefault();
    const apiKey = '7720c28518514a184cd11489092835d0';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let response = await fetch(apiUrl);
    if (response.status === 200) {
      let data = await response.json();
      setAllData(data);
      let tempData = data.main;
      setMainData(tempData);
      let weather = data.weather;
      let description = weather[0];
      setWeatherData(description);
    } else { alert('invalid city') }
  }
  let celsius = Math.round(mainData.temp);
  let minCelsius = Math.round(mainData.temp_min);
  let maxCelsius = Math.round(mainData.temp_max);
  let date = new Date().toLocaleString();

  return (
    <div>
      <header className="header">Mario's Weather App</header>
      <div className='container'>
        <div className="bodyStyle">
          <div id="cloud-intro">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <input
                    className="searchBox"
                    type="text"
                    placeholder="Enter a city..."
                    autoComplete="off"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <button className="searchButton" type="submit">
                    Search
              </button>
                </div>
              </div>
            </form>

            <div>
              <h1>{allData.name}</h1>
            </div>
            <div>
              <div>
                <span className="temperatureStyle">
                  Current Temperature:
              <br />
                  <p>
                    {' '}
                    {(celsius = isNaN(celsius) ? '' : celsius)} °C
                <img
                      src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `http://openweathermap.org/img/wn/02d@2x.png`;
                      }}
                      alt="weather icon"
                    />
                  </p>
              Condition: {weatherData.main}
                </span>
              </div>
            </div>

            <div>
              <ul className="listStyle">
                <li>Min: {(minCelsius = isNaN(minCelsius) ? '' : minCelsius)}°C</li>
                <li>Max: {(maxCelsius = isNaN(maxCelsius) ? '' : maxCelsius)}°C</li>
                <li>Humidity: {mainData.humidity}%</li>
                <li>Pressure: {mainData.pressure} hPa</li>
              </ul>
            </div>
            <p>
              Last updated: {date}
              <br />
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">Code by Mario</footer>
    </div>
  );
}

export default App;
