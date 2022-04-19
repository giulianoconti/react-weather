import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './index.css';

export function App() {
  const [loading, setLoading] = useState(false);
  const [forecastday, setForecastday] = useState([]);
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    const loadPost = async () => {

      // Till the data is fetch using API 
      // the Loading page will show.
      setLoading(true);

      // Await make wait until that 
      // promise settles and return its result
      const response = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json?key=8744cf9039284af0a90210222221804&q=Resistencia&days=3&aqi=no&alerts=no");

      // After fetching data stored it in posts state.
      setForecastday(response.data.forecast.forecastday);
      setCurrent(response.data.current);

      // Closed the loading page
      setLoading(false);
    }

    // Call the function
    loadPost();
  }, []);

  return (
    <div className="App">
      {
        loading
          ? <h4>Loading...</h4>
          : forecastday.map((weather, index) => {
            return (
              <div key={index} className='weather-container'>

                <div className='weather-principal-info'>
                  <h1>{weather.date}</h1>
                  <div>
                    <h2>{weather.day.condition.text}  </h2>
                    <img src={weather.day.condition.icon} alt={weather.day.condition.text}></img>
                  </div>
                  <h3>{current.temp_c}°</h3>
                  <p>H:{weather.day.maxtemp_c}° L:{weather.day.mintemp_c}°</p>
                </div>



                <div className='weather-per-hour-container weather-scrollmenu'>
                  {
                    weather.hour.map((hour, index) =>
                      <div key={index} className='weather-per-hour-all-item'>
                        <h3 className='weather-per-hour-item'>{hour.time.substring(11, 13)}</h3>
                        <img className='weather-per-hour-item' src={hour.condition.icon} alt={hour.condition.text}></img>
                        <h3 className='weather-per-hour-item'>{Math.round(hour.temp_c)}°</h3>
                      </div>
                    )
                  }
                </div>

                <div className='weather-extra-info'>
                  <div className='weather-extra-info-item-container'>
                    <h5>SUNRISE</h5>
                    <p>{weather.astro.sunrise}</p>
                  </div>
                  <div className='weather-extra-info-item-container'>
                    <h5>SUNSET</h5>
                    <p>{weather.astro.sunset}</p>
                  </div>
                  <div className='weather-extra-info-item-container'>
                    <h5>CHANCE OF RAIN</h5>
                    <p>{weather.day.daily_chance_of_rain} %</p>
                  </div>
                  <div className='weather-extra-info-item-container'>
                    <h5>HUMIDITY</h5>
                    <p>{weather.day.avghumidity} %</p>
                  </div>
                  <div className='weather-extra-info-item-container'>
                    <h5>PRECIPITATION</h5>
                    <p>{weather.day.totalprecip_mm} mm</p>
                  </div>
                  <div className='weather-extra-info-item-container'>
                    <h5>Wind</h5>
                    <p>{weather.day.maxwind_kph} km/hr</p>
                  </div>
                </div>


              </div>
            )
          })
      }

      {/* <button onClick={() => console.log(forecastday)}>show</button>
      <button onClick={() => console.log(forecastday[0].hour[0])}>hour</button>
      <button onClick={() => console.log(current)}>asd</button> */}
    </div>
  );
}


