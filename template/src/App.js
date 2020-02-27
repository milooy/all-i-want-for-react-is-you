import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import logo from './logo.svg'
import './App.css';
import PaletteContainer from './containers/PaletteContainer';
import CounterContainer from './containers/CounterContainer';
import WaitingListContainer from './containers/WaitingListContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/waiting">Waiting list</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/waiting">
            <WaitingListContainer />
          </Route>
          <Route path="/">
            <PaletteContainer />
            <CounterContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
