import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentPosition();
        const weatherData = await fetchWeatherData(position.coords.latitude, position.coords.longitude);
        setData(weatherData);
      } catch (error) {
        console.log(error);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const fetchWeatherData = async (lat, lon) => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log(result);
      return result;
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? <Weather weatherData={data} /> : <div>Loading...</div>}
    </div>
  );
}