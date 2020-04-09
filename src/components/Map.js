import React from 'react'
import ReactMapGL from 'react-map-gl'

function Map({coord}) {
    const viewport = {
        latitude: coord.lat,
        longitude: coord.lon,
        width:"100vw",
        height: "100vh",
        zoom:10
    };

    console.log(viewport);
    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/andreagallo/ck8s5hvgi0px01inx3rbgct1g"
                mapboxApiAccessToken={process.env.REACT_APP_MAPGL_KEY}
            />
        </div>
    )
}

export default Map;
