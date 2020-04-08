import React, {Fragment, useState} from 'react';
import Spinner from './components/Spinner';
import './App.css';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';

function App() { 
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  const [currentWeatherResults, setCurrentWeatherResults] = useState({});
  const [forecastResults, setForecastResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const renderResults = () => {
    if(isSearching){
      return <Spinner /> 
    } else if (Object.entries(currentWeatherResults).length && forecastResults.length) {
      return <>
       <Weather {...currentWeatherResults}/>
      </>
    }
    else {
      return null
    }
  }

  return (
    <Fragment>
        <SearchForm 
          setIsSearching={setIsSearching} 
          setCurrentWeatherResults={setCurrentWeatherResults}
          setForecastResults={setForecastResults}
          history={history}
          setHistory={setHistory} />
          <div>
            RESULTS
            {renderResults()}
          </div>
          <div>
            <p>LENGTH {history.length}</p>
            <p>HISTORY {JSON.stringify(history)}</p>
          </div>
          
          
    </Fragment>
    
  );
}

export default App;

