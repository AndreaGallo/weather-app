import React, {useState} from 'react'
import CurrentWeather from './CurrentWeather'



const Forecast = () => {
    let [responseObj, setResponseObj] = useState({})
    let [city, setCity] = useState('');
    
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const getForecast = (e) => {
        e.preventDefault();

        if(city.length === '') {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
        setLoading(true);

        console.log('key',process.env)
        
        .catch(error => {
            setError(true);
            setLoading(true);
            console.log(error.message);
        });
    }

    return (
        <div>
            <h2>Find Current Weather data</h2>
            
           <CurrentWeather 
            data={responseObj}
            error={error}
            loading={loading}/>
        </div>
    )
}

export default Forecast
