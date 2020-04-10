import React, {useState, useEffect} from 'react'
import ReactMapGL from 'react-map-gl'
import PropTypes from 'prop-types'

const Map = ({coord}) => {
    const [viewport, setViewport] = useState();

    const settings = {
        width:"100%",
        height: "30vw",
        zoom:12
    };

    useEffect(() => {
        setViewport({
            latitude: coord.lat,
            longitude: coord.lon
        })
    }, [coord])

    return (
        <div>
            <ReactMapGL
                {...viewport}
                {...settings}
                onViewportChange={(v) => {
                    setViewport({
                        latitude: v.latitude,
                        longitude: v.longitude
                    })
                }}
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