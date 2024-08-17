import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import GameBoard from './Components/GameBoard';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/gameboard" component={GameBoard} />
            </Switch>
        </Router>
    );
}

export default App;
