import React, { useState } from 'react';
import axios from 'axios';
import style from './weather.module.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(''); // Used to display errors
  const [loading, setLoading] = useState(false); // Loader state

  const API_KEY = '7f62a15207a51762fce43f67bfd707f6'; // Replace with your actual API key

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setLoading(false);

      if (response.data.main) {
        setWeather(response.data);
        setError(''); // Clear any previous errors
      } else {
        setError('No weather data available for this city.');
      }
    } catch (err) {
      setLoading(false);
      setError('Unable to fetch weather data. Please check the city name or try again later.');
      setWeather(null);
    }
  };

  const resetWeather = () => {
    setCity('');
    setWeather(null);
    setError('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className={style.mainbox}>
      <h1>Weather App</h1>
      <div className={style.weather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress} // Allow "Enter" key to search
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>Get Weather</button>
        <button onClick={resetWeather} className={style.resetButton}>Reset</button> {/* Reset button */}

        {loading && <p>Loading...</p>} {/* Loading state */}

        {error && <p className={style.error}>{error}</p>} {/* Error handling */}

        {weather && weather.main && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
