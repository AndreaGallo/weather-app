import React from 'react'

const CurrentWeather = (props) => {
    const {cod, name, main, weather} = props.data;
    const {error, loading } = props;

    return (
        <div>
            {JSON.stringify(props.response)}
            {error &&  <small>Please enter a valid city.</small>}
            {loading && <div>Loading...</div>}
            {cod === 200?
                <div>
                   <p><strong>{name}</strong></p>
                   <p>It is currently {Math.round(main.temp)} degrees out with {weather[0].description}.</p>
               </div>
               : null
            }
        </div>
    )
}

export default CurrentWeather
