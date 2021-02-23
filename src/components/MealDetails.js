import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { properties } from '../properties';
import Modal from 'react-modal';
import Recipe from './Recipe';
import Nutrition from './Nutrition';
import '../styling/MealDetails.css';

function MealDetails(props) {
  let id = props.match.params.id;

  const [mealSummary, setMealSummary] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealPicture, setMealPicture] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isRecipe, setIsRecipe] = useState(false);

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '20%',
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${properties.forthKey}`
      )
      .then((response) => {
        setMealSummary(response.data);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${properties.forthKey}`
      )
      .then((response) => {
        setMealIngredients(response.data.ingredients);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${properties.forthKey}&includeNutrition=false`
      )
      .then((response) => {
        setMealPicture(response.data.image);
        console.log(response.data.image);
      });
  }, [id]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openRecipeModal() {
    openModal();
    setIsRecipe(true);
  }

  function openNutritionModal() {
    openModal();
    setIsRecipe(false);
  }

  return (
    <>
      <div className="title-container">
        <h3>{mealSummary.title}</h3>
      </div>
      <br />

      <div className="meal-details-button-container">
        <button
          onClick={openRecipeModal}
          type="button"
          className="btn btn-outline-success"
        >
          Get Recipe
        </button>
        <button
          onClick={openNutritionModal}
          type="button"
          className="btn btn-outline-success"
        >
          See Nutrition Values
        </button>
      </div>

      <div className="meal-description">
        <p dangerouslySetInnerHTML={{ __html: mealSummary.summary }} />
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <img src={mealPicture} alt="mealpicture" />
          </div>
          <div className="col">
            <table className="table table-striped table-light">
              <thead className="table-warning">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>

              <tbody>
                {mealIngredients.map((ingredient, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.amount.metric.value} g</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <Modal
          scrollable={true}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Nutrition Facts"
        >
          {isRecipe ? (
            <div>
              <h2>Recipe</h2>
              <Recipe mealId={id} />
            </div>
          ) : (
            <div>
              <h2>Nutrition Facts</h2>
              <Nutrition mealId={id} />
            </div>
          )}

          <button
            onClick={closeModal}
            type="button"
            className="btn btn-primary"
          >
            Close
          </button>
        </Modal>
      </div>
    </>
  );
}

export default MealDetails;
