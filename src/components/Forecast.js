import React from 'react';
import PropTypes from 'prop-types';

const Forecast = ({forecast}) => {
    return (
        <div className="columns">
            {
                forecast.map((data,index) =>  {
                    const {day, tempMax, tempMin, icon, main} = data;
                    return (
                        <div className="column" key={index}>
                            <div className="card has-background-white-ter">
                                <div className="card-content is-capitalized">
                                    <div className="media">
                                        <div className="media-content has-text-centered">
                                            <p className="title is-6">{day}</p>
                                            <figure className="forecast-image image is-inline-block is-64x64 has-background-grey-lighter">
                                                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main}/>
                                            </figure>
                                            <p className="subtitle is-7">{tempMax}&deg;C / {tempMin}&deg;C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}   

export default Forecast;

Forecast.propTypes = {
    forecast:  PropTypes.array
}

Forecast.defaultProps = {
    forecast: []
}