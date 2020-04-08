import React from "react";

const WeatherCard = props => {

    const {city, country, humidity, icon, temperature} = props;

    return (
        <div>
            <p>{city + ',' + country}</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icon"/>
            <p>{Math.round(temperature)}&deg;C</p>
            <p>{humidity}% Humidity</p>
        </div>
    );
};

export default WeatherCard;
  