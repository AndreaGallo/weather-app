import React from 'react'
import ReactMapGL from 'react-map-gl'
import PropTypes from 'prop-types'

const Map = ({coord}) => {
    const viewport = {
        latitude: coord.lat,
        longitude: coord.lon,
        width:"100%",
        height: "30vw",
        zoom:12
    };

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/andreagallo/ck8s5hvgi0px01inx3rbgct1g"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
        </div>
    )
}

export default Map;

Map.propTypes = {
    coord: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
    })
}

Map.defaultProps = {
    coord: {
        lat: 0,
        lon: 0
    }
}