import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../properties';

function WineDetails(props) {
  let wineName = props.match.params.name;

  const [wineDetails, setWineDetails] = useState('');
  const [wineFoodPairing, setWineFoodPairing] = useState([]);
  const [wineError, setWineError] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/food/wine/description?apiKey=${properties.forthKey}&wine=${wineName}`
      )
      .then((response) => {
        setWineDetails(response.data.wineDescription);
      });

    axios
      .get(
        `https://api.spoonacular.com/food/wine/dishes?apiKey=${properties.forthKey}&wine=${wineName}`
      )
      .then((response) => {
        if (response.data.status === 'failure') {
          setWineError(response.data.message);
        } else {
          setWineFoodPairing(response.data.pairings);
        }
      });
  }, [wineName]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="title-container">
            <h3>{wineName.toUpperCase()}</h3>
          </div>
          <div className="col">
            <div className="description-container">
              Description : {wineDetails}
            </div>
          </div>
          <div className="col">
            <div>
              <h3>Goes well with:</h3>
              <div className="meal-pairing-container">
                {wineError.length < 2
                  ? wineFoodPairing.map((food, index) => {
                      return (
                        <p key={index}>
                          {food.charAt(0).toUpperCase() + food.slice(1)}
                        </p>
                      );
                    })
                  : wineError.replace('_', ' ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WineDetails;
