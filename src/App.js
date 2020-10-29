import React, {useEffect, useState} from 'react';
import './styles/App.scss';
import './styles/weather.scss';

import WeatherApi from './api/weather';
import GeoLocationApi from './api/geolocation';

import './fonts/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function App() {
    let [location, setLocation] = useState('');
    let [language, setLanguage] = useState('en');
    let [units, setUnits] = useState('metric');
    let [weatherData, setWeatherData] = useState({data: false});

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
    let setInputLocation = (event) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            setLocation(event.target.value);
        }, 2500);
    };

    let getWeatherData = (locationName) => {
        if (locationName.length >= 3) {
            console.log('LLAMAMOS API CON', locationName);
            WeatherApi.getWeatherLocation(locationName, language, units)
                .then((data) => {
                    setWeatherData({...weatherData, data: data});
                })
                .catch((error) => {
                    console.log(error);
                    setWeatherData({data: false});
                });
        }
    };

    return (
        <div className="container">
            {/* {weatherData.data ? (
                <p>SI HAY DATOS {JSON.stringify(weatherData, null, 2)}</p>
            ) : (
                <p>NO HAY DATOS </p>
            )} */}
            {weatherData.data.cod === 200 && (
                <div
                    className={`data ${
                        weatherData.data.cod === 200 ? 'fade-in' : 'fade-out'
                    }`}>
                    <header>
                        <div className="icon sun-shower">
                            <div className="cloud"></div>
                            <div className="sun">
                                <div className="rays"></div>
                            </div>
                            <div className="rain"></div>
                        </div>
                        <h1>{weatherData.data.name}</h1>
                    </header>
                    <section>
                        <div className="data-item">
                            <label>Wind speed</label>
                            <FontAwesomeIcon
                                icon="wind"
                                className="wind-color"
                            />
                            <p>{weatherData.data.wind.speed} m/s</p>
                        </div>
                        <div className="data-item">
                            <label>Curr. temp.</label>
                            <FontAwesomeIcon
                                icon="temperature-high"
                                className="temp-color"
                            />
                            <p>{weatherData.data.main.temp} º</p>
                        </div>
                        <div className="data-item">
                            <label>Min. temp.</label>
                            <FontAwesomeIcon
                                icon="chevron-down"
                                className="min-temp-color"
                            />
                            <p>{weatherData.data.main.temp_min} º</p>
                        </div>
                        <div className="data-item">
                            <label>Max temp.</label>
                            <FontAwesomeIcon
                                icon="chevron-up"
                                className="max-temp-color"
                            />
                            <p>{weatherData.data.main.temp_max} º</p>
                        </div>
                        <div className="data-item">
                            <label>Pressure</label>
                            <FontAwesomeIcon
                                icon="tachometer-alt"
                                className="pressure-color"
                            />
                            <p>{weatherData.data.main.pressure}</p>
                        </div>
                        <div className="data-item">
                            <label>Humidity</label>
                            <FontAwesomeIcon
                                icon="tint"
                                className="humidity-color"
                            />
                            <p>{weatherData.data.main.humidity}</p>
                        </div>
                    </section>
                </div>
            )}
            <label>
                <input
                    type="text"
                    className="input"
                    onChange={setInputLocation}
                />
                <div className="label-text">Type a location...</div>
            </label>
            <footer>
                <p>
                    <a href="https://github.com/arkanos" target="_blank">
                        Made with <span style={{color: '#e25555'}}>❤</span>
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
