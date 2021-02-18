import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { properties } from '../properties';
import Modal from 'react-modal';
import Nutrition from './Nutrition';

function MealDetails(props) {
  let id = props.match.params.id;

  const [mealSummary, setMealSummary] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealPicture, setMealPicture] = useState('');

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

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#070101';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <h3>{mealSummary.title}</h3>
      <br />

      <div>
        <Link to={`${id}/recipe`}>
          <button type="button" className="btn btn-outline-success">
            Get Recipe
          </button>
        </Link>
        <button
          onClick={openModal}
          type="button"
          className="btn btn-outline-success"
        >
          See Nutrition Values
        </button>
      </div>

      <p dangerouslySetInnerHTML={{ __html: mealSummary.summary }} />

      <div className="container">
        <div className="row">
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
                      <th scope="row">{index}</th>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.amount.metric.value} g</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="col">
            <img src={mealPicture} alt="mealpicture" />
          </div>
        </div>
      </div>

      <div>
        <Modal
          scrollable={true}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Nutrition Facts"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Nutrition Facts</h2>

          <Nutrition mealId={id} />

          <button
            onClick={closeModal}
            type="button"
            className="btn btn-primary"
          >
            close
          </button>
        </Modal>
      </div>
    </>
  );
}

export default MealDetails;
