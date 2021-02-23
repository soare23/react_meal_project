import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../properties';

function Recipe({ mealId }) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${properties.forthKey}&includeNutrition=false`
      )
      .then((response) => {
        setRecipe(response.data.extendedIngredients);
      });
  }, [mealId]);

  return (
    <>
      <div className="container">
        <table className="table table-striped table-light">
          <thead className="table-warning">
            <tr>
              <th scope="col">Aisle</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>

              <th scope="col">Unit</th>
            </tr>
          </thead>

          <tbody>
            {recipe.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.aisle}</th>
                  <td>{item.name}</td>
                  <td>{item.amount + ' ' + item.measures.metric.unitLong}</td>
                  <td>{item.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Recipe;
