import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import TestPage from './components/TestPage';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path='/'
            name='Dashboard'
            component={Dashboard}
          />
          <Route
            exact
            path='/dashboard'
            name='TestPage'
            component={TestPage}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
