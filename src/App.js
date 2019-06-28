import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container-fluid">
            <div>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
