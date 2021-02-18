import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { properties } from '../properties';

function Random(props) {
  const [randomMeal, setRandomMeal] = useState([{}]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${properties.forthKey}`
      )
      .then((response) => {
        setRandomMeal(response.data.recipes[0]);
      });
  }, []);

  return (
    <>
      <h3>{randomMeal.title}</h3>

      <div className="container">
        <div className="row">
          <div className="col">
            <div dangerouslySetInnerHTML={{ __html: randomMeal.summary }} />
          </div>
          <div className="col">
            <img src={randomMeal.image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Random;
