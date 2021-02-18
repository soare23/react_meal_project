import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../properties';

function Nutrition({ mealId }) {
  const [badNutritionInfo, setBadNutritionInfo] = useState([]);
  const [goodNutritionInfo, setGoodNutritionInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${mealId}/nutritionWidget.json?apiKey=${properties.forthKey}`
      )
      .then((response) => {
        setBadNutritionInfo(response.data.bad);
        setGoodNutritionInfo(response.data.good);
      });
  }, [mealId]);

  return (
    <div>
      <div style={{ border: 'solid black 5px' }}> </div>
      <div>
        <b>Amount per serving</b>
      </div>

      <div style={{ border: 'solid black 1px' }}> </div>

      <p style={{ float: 'right' }}>
        <b>% Daily Value*</b>
      </p>
      <br />
      <br />

      {badNutritionInfo.map((value, index) => {
        return (
          <div key={index}>
            <div style={{ border: 'solid black 1px' }}> </div>
            <div>
              <b>{value.title}</b> {value.amount}{' '}
              <div style={{ 'text-align': 'right' }}>
                {value.percentOfDailyNeeds}%
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ border: 'solid black 3px' }}> </div>

      {goodNutritionInfo.map((value, index) => {
        return (
          <div key={index}>
            <div style={{ border: 'solid black 1px' }}> </div>
            <div>{value.title + ' ' + value.amount} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Nutrition;
