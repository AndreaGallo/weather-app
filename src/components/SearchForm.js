import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../useDebounce';


const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


const SearchForm = (props) => {
    
    const {
        city,
        setCity,
        error,
        setError,
        setCurrentWeatherResults, 
        setForecastResults,
        setIsSearching, 
        history, 
        setHistory
    } = props;
    //We us debounce to avoid making an API call for every letter we type
    const debouncedSearchCity = useDebounce(city, 500);

    useEffect(() => {
        if (debouncedSearchCity) {
            setIsSearching(true);
            setError(false);
            
            let  cachedCity; 
            
            // We verify if city is in local storage
            if (history.length) {
                cachedCity = history.find(item => item.city && item.city.toUpperCase() === debouncedSearchCity.toUpperCase());
            }
            
            // If city is in the local storage, we get its currentWeather and forecast to display. If it is not in
            // the local storage, we make a call to the api, we get the currentWeather and forecast and we store them
            // in the local storage
            if (cachedCity) {
                let {current, forecast} = cachedCity;
                setIsSearching(false);
                setCurrentWeatherResults(current);
                setForecastResults(forecast);
            } else {
                let cachedResult = { }
                getCurrentWeather(debouncedSearchCity)
                .then(response => {
                    setIsSearching(false)
                    cachedResult.city = debouncedSearchCity;
                    cachedResult.current = response;
                    setCurrentWeatherResults(response)
                    return getForecast(response.coord);
                })
                .then(response => {
                    cachedResult.forecast = response;
                    const newHistory = [cachedResult, ...history];

                    if(newHistory.length > 5) {
                        newHistory.pop()
                    }

                    localStorage.setItem('history', JSON.stringify(newHistory));
                    setHistory(newHistory)
                    setForecastResults(response)
                })
                .catch(error => {    
                    setIsSearching(false)
                    setForecastResults([])
                    setCurrentWeatherResults({})
                    setError(true);
                })
            }
        } else {
            setIsSearching(false)
            setForecastResults([])
            setCurrentWeatherResults({})
            setError(false)
        }
    }, [
        debouncedSearchCity,
        setCurrentWeatherResults,
        setForecastResults,
        setIsSearching, 
        history, 
        setHistory,
        setError
    ]);

    return (
        <div className="control search-form has-icons-left">
            <input
                className={`input is-rounded is-capitalized ${error? 'is-danger' : ''}`}
                type="text"
                placeholder="Type city name to find weather info"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
            </span>
        </div>
    )
}


export default SearchForm;


SearchForm.propTypes = {
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    setError: PropTypes.func.isRequired,
    setCurrentWeatherResults: PropTypes.func.isRequired, 
    setForecastResults: PropTypes.func.isRequired,
    setIsSearching: PropTypes.func.isRequired, 
    history: PropTypes.array.isRequired, 
    setHistory: PropTypes.func.isRequired
} 


function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error: City " + response.statusText);
    }
}


function getCurrentWeather(city) {
    let uriEncodedCity = encodeURIComponent(city);
    const url = `${API_URL}/weather?q=${uriEncodedCity}&units=metric&appid=${API_KEY}`;
    
    return fetch(url)
    .then(response => handleResponse(response))
    .then(response => mapDataToWeather(response))

}

function getForecast({lat,lon}) {
    const url = `${API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    return fetch(url)
    .then(response => handleResponse(response))
    .then(response => {
        let daily = [];
        response.daily.forEach(day => {
            daily.push(mapDataToForecast(day))
        });
        return daily;
        
    })
}

function mapDataToWeather(data) {
    const mapped = {
      city: data.name,
      country: data.sys.country,
      date: parseDate(data.dt),
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      description: data.weather[0].description,
      coord: data.coord
    };     
  
    return mapped;
  }


function mapDataToForecast(data) {
    const date = parseDate(data.dt);
    
    const dateSplitted = date.split(',');
    const day = dateSplitted[0];

    const mapped = {
        day: day.slice(0, 3),
        tempMax: Math.round(data.temp.max),
        tempMin: Math.round(data.temp.min),
        icon: data.weather[0].icon,
        main: data.weather[0].main
    };

    return mapped;
}

function parseDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}