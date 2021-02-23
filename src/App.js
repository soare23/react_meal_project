import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Wine from './components/Wine';
import Random from './components/RandomMeal';
import Meals from './components/Meals';
import MealDetails from './components/MealDetails';
import WineDetails from './components/WineDetails';
import Videos from './components/Video';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path={'/meals'} component={Meals} />
        <Route path={'/random'} component={Random} />
        <Route exact path={'/wine'} component={Wine} />
        <Route exact path={'/meal/:id'} component={MealDetails} />
        <Route path={'/wine/:name'} component={WineDetails} />
        <Route path={'/videos'} component={Videos} />
      </Router>
    </div>
  );
}

export default App;
