import {API_KEY} from '../config/config.json';

const WeatherApi = {
    getWeatherLocation: (location, language = 'en', units = 'metric') => {
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${language}&units=${units}`;
        return fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    },
};

export default WeatherApi;
