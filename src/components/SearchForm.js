import React, {useState, useEffect} from 'react';
import useDebounce from '../useDebounce';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


const SearchForm = ({city,setCity,setCurrentWeatherResults, setForecastResults,setIsSearching, history, setHistory}) => {
    
    const [error, setError] = useState('');
    const debouncedSearchCity = useDebounce(city, 500);

    useEffect(() => {
        if (debouncedSearchCity) {
            setIsSearching(true);
            setError('');
            
            let  cachedCity; 

            if (history.length) {
                cachedCity = history.find(item => item.city.toUpperCase() === debouncedSearchCity.toUpperCase());
            }
            
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
                    setError(error.message);
                })
            }
        } else {
            setIsSearching(false)
            setForecastResults([])
            setCurrentWeatherResults({})
            setError('')
        }
    }, [debouncedSearchCity,setCurrentWeatherResults,setForecastResults,setIsSearching, history, setHistory])


    return (
        <div>
            <input
                type="text"
                placeholder="Enter City"
                maxLength="50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            <p>{error}</p>
        </div>
    )
}


export default SearchForm;

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error: City " + response.statusText);
    }
}

function getCurrentWeather (city) {
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
        console.log(response.daily)
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
      date: new Date(data.dt * 1000),
      temperature: data.main.temp,
      maxTemperature: data.main.temp_max,
      minTemperature: data.main.temp_min,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.presure,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      description: data.weather[0].description,
      coord: data.coord
    };     
  
    return mapped;
  }


  function mapDataToForecast(data) {
    const mapped = {
      date: new Date(data.dt * 1000),
      tempMax: data.temp.max,
      tempMin: data.temp.min,
      humidity: data.humidity,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      description: data.weather[0].description
    };
  
    return mapped;
  }