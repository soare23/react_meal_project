import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to={'/meals'} className="nav-link">
            Meals
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/random'} className="nav-link">
            Random Meal
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/wine'} className="nav-link">
            Wine
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
