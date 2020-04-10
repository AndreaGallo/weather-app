import React from "react";
import PropTypes from 'prop-types'
import Map from './Map';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import PreviousSearchList from './PreviousSearchList';

const WeatherCard = ({weather, forecast, history, setHistory, city, setCity}) => {

    const { coord } = weather;

    return (
        <>
            <div className="columns">
                <div className="column is-3">
                    <CurrentWeather {...weather}/>
                </div>
                <div className="column is-6">
                    <Map coord={coord}/>
                </div> 
                <div className="column is-3 is-hidden-mobile">
                    <h3 className="is-size-5 is-uppercase has-text-centered list-title">Searched cities</h3>
                    <PreviousSearchList 
                        history={history}
                        setHistory={setHistory}
                        city={city}
                        setCity={setCity}
                    />
                </div>
            </div>
            <Forecast forecast={forecast}/>
        </>
    );
};

export default WeatherCard;

WeatherCard.propTypes = {
    weather: PropTypes.object.isRequired, 
    forecast: PropTypes.array.isRequired,
    history: PropTypes.array.isRequired, 
    setHistory: PropTypes.func.isRequired, 
    city: PropTypes.string.isRequired, 
    setCity: PropTypes.func.isRequired
}
  