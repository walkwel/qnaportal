import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import './App.css';
import Routes from './routes';

const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

class App extends Component {
  constructor() {
    super();
    this.state = {
      userKey: null,
    }
  }
  showList = (dataFromChild) => {
    this.setState({
      userKey: dataFromChild
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
