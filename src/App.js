import React, {useEffect, useState} from 'react';
import './styles/App.scss';
import './styles/weather.scss';

import WeatherApi from './api/weather';
import GeoLocationApi from './api/geolocation';

import './fonts/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Weather from './components/weather';

function App() {
    let [location, setLocation] = useState('');
    let [weatherData, setWeatherData] = useState({});
    let [transitioning, setTransitioning] = useState(true);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                GeoLocationApi.getCityFromCoordinates(
                    position.coords.latitude,
                    position.coords.longitude,
                )
                    .then((locationName) => {
                        getWeatherData(locationName);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    }, []);

    useEffect(() => {
        getWeatherData(location);
    }, [location]);

    let timeout = false;
    const setInputLocation = (event) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            setLocation(event.target.value);
            setTransitioning(false);
        }, 2500);
    };

    const getWeatherData = (locationName) => {
        if (locationName.length >= 3) {
            WeatherApi.getWeatherLocation(locationName)
                .then((data) => {
                    setTransitioning(true);
                    setWeatherData(data);
                })
                .catch((error) => {
                    console.log(error);
                    setWeatherData({});
                });
        }
    };

    return (
        <div className="container">
            {weatherData.cod === 200 ? (
                <div className={transitioning ? 'fade-in' : 'fade-out'}>
                    <header>
                        <Weather
                            iconId={weatherData.weather[0].id}
                            sunrise={weatherData.sys.sunrise}
                            sunset={weatherData.sys.sunset}
                        />
                        <h1>
                            {weatherData.name}
                            <span className="pill">
                                {weatherData.sys.country}
                            </span>
                        </h1>
                    </header>
                    <section>
                        <div className="data-item">
                            <label>Wind speed</label>
                            <FontAwesomeIcon
                                icon="wind"
                                className="wind-color"
                            />
                            <p>{weatherData.wind.speed} m/s</p>
                        </div>
                        <div className="data-item">
                            <label>Curr. temp.</label>
                            <FontAwesomeIcon
                                icon="temperature-high"
                                className="temp-color"
                            />
                            <p>{Math.round(weatherData.main.temp)} º</p>
                        </div>
                        <div className="data-item">
                            <label>Min. temp.</label>
                            <FontAwesomeIcon
                                icon="chevron-down"
                                className="min-temp-color"
                            />
                            <p>{Math.round(weatherData.main.temp_min)} º</p>
                        </div>
                        <div className="data-item">
                            <label>Max temp.</label>
                            <FontAwesomeIcon
                                icon="chevron-up"
                                className="max-temp-color"
                            />
                            <p>{Math.round(weatherData.main.temp_max)} º</p>
                        </div>
                        <div className="data-item">
                            <label>Pressure</label>
                            <FontAwesomeIcon
                                icon="tachometer-alt"
                                className="pressure-color"
                            />
                            <p>{weatherData.main.pressure} hPa</p>
                        </div>
                        <div className="data-item">
                            <label>Humidity</label>
                            <FontAwesomeIcon
                                icon="tint"
                                className="humidity-color"
                            />
                            <p>{weatherData.main.humidity} %</p>
                        </div>
                    </section>
                </div>
            ) : null}
            {weatherData.cod === '404' ? (
                <div className="not-found">
                    <h1>Ooops! Location not found</h1>
                </div>
            ) : null}
            <label>
                <input
                    type="text"
                    className="input"
                    onChange={setInputLocation}
                    required
                />
                <div className="label-text">Type a location...</div>
            </label>
            <footer>
                <p>
                    <a
                        href="https://github.com/arkanos"
                        target="_blank"
                        rel="noopener noreferrer">
                        Made with <span style={{color: '#e25555'}}>❤</span>
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
