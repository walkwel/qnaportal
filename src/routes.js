import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard'

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
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
