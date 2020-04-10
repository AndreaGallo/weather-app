import React from 'react'
import PropTypes from 'prop-types'

const PreviousSearchList = ({history, setHistory, city, setCity}) => {
    const  isActive = searchedCity => (searchedCity.toUpperCase() === city.toUpperCase());

    const deleteCity = (index) => {
        if (index > -1) {
            let searchedCities = [...history];
            searchedCities.splice(index, 1);
            setHistory(searchedCities);
         //   localStorage.setItem('history', JSON.stringify(searchedCities));
        }
    }

    return (
        <div className="list is-hoverable">
            {   //The city which weather is displayed will not be deleted. This let us to access its weather info
                // next time we enter to the app
                history.map(({city},index) =>  {
                    if(city) {
                        let isCityActive = city && isActive(city);
                        return (
                            <a 
                                href="/#" 
                                key={index} 
                                disabled={isCityActive}
                                className={`list-item is-capitalized ${isCityActive? 'is-active disabled' : 'is-deleted'}`}
                            >
                                <span 
                                    title={`${!isCityActive? 'Click to view weather info' : ''}`}
                                    className="item-name is-capitalized"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCity(city);
                                    }}
                                >
                                    {city}
                                </span>
                                <span 
                                    className="icon" 
                                    title={`${!isCityActive? 'Delete' : ''}`}
                                    onClick={() => {
                                        if (!isCityActive) {
                                            deleteCity(index)
                                        }
                                    }}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </a>
                        ) 
                    } else {
                        return null
                    }
                      
                })
            }
        </div>
    )    
}

export default PreviousSearchList;

PreviousSearchList.propTypes = {
    history: PropTypes.array.isRequired,
    setHistory: PropTypes.func.isRequired, 
    city: PropTypes.string.isRequired, 
    setCity: PropTypes.func.isRequired
}

