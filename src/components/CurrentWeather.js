import React from 'react';
import PropTypes from 'prop-types';

const CurrentWeather = (props) => {
    const {
        city, 
        country, 
        date, 
        temperature, 
        humidity,
        pressure,
        icon,
        main,
        description
    } = props;
  
    return (
        <div className="card has-background-white-ter">
            <header className="card-header">
                <p className="card-header-title">
                    {city + ', ' + country}
                    <br/>
                    {date}
                </p>
            </header>
            <div className="card-content is-capitalized has-text-centered">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-128x128 has-background-grey-lighter">
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main}/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{temperature}&deg;C</p>
                        <p className="subtitle is-6">{description}</p>
                    </div>
                </div>

                <div className="content">
                    <div className="columns">
                        <div className="column">
                            <span>Humidity</span>
                            <h4>{humidity}%</h4>   
                        </div>
                        <div className="column">
                            <span>Pressure</span>
                            <h4>{pressure} hPa</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CurrentWeather;

    
CurrentWeather.propTypes = {
    city: PropTypes.string, 
    country: PropTypes.string, 
    date: PropTypes.string, 
    temperature: PropTypes.number, 
    humidity: PropTypes.number,
    pressure: PropTypes.number,
    icon: PropTypes.string,
    main: PropTypes.string,
    description: PropTypes.string
}

CurrentWeather.defaultProps = {
    city: '', 
    country: '', 
    date: '', 
    temperature: 0, 
    humidity: 0,
    pressure: 0,
    icon: '',
    main: '',
    description: ''
}
