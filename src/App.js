import React, {useState} from 'react';
import Spinner from './components/Spinner';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';
import NotFound from './components/NotFound';
import './App.css';
import 'bulma/css/bulma.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() { 
  const [city, setCity] = useState('Tucuman');
  const [currentWeatherResults, setCurrentWeatherResults] = useState({});
  const [forecastResults, setForecastResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
 

  const renderResults = () => {
    if(isSearching){
      return <Spinner /> 
    } else if (Object.entries(currentWeatherResults).length) {
      return (
        <Weather
          history={history}
          setHistory={setHistory}
          city={city}
          setCity={setCity} 
          weather={currentWeatherResults}
          forecast={forecastResults}
        />
      )
    }
    else {
      return null
    }
  }

  return (
    <div className="container app">
        <h1 className="app-title is-size-6 is-uppercase has-text-centered-touch">
            Weather App
        </h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <SearchForm 
              city={city}
              setCity={setCity}
              error={error}
              setError={setError}
              setIsSearching={setIsSearching} 
              setCurrentWeatherResults={setCurrentWeatherResults}
              setForecastResults={setForecastResults}
              history={history}
              setHistory={setHistory} 
            />
            {error && <NotFound />}
          </div>
        </div>      
        {renderResults()}
    </div>
  );
}

export default App;

