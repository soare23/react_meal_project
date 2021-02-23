import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styling/RandomMeal.css';

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
      <div className="title-container">
        <h3>{randomMeal.title}</h3>
      </div>
      <div className="containe random-meal-container">
        <div className="row">
          <div className="col image-container">
            <img src={randomMeal.image} alt="" />
          </div>
          <div className="col text-container">
            <div dangerouslySetInnerHTML={{ __html: randomMeal.summary }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Random;
