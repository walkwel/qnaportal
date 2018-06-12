import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core';
import configureStore from './store';
import paragraph from '@material-ui/core/Typography';
import QuestionList from './QuestionList';
import './App.css';
import User from './User';
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
        {/* <Routes /> */}
        <div className="App">
          {this.state.userKey === null ? <User enteredUser={this.showList} /> : 
            <div>
              <Typography variant="display3" color="primary" align="center" >NUMERICAL REASONING</Typography>
              <QuestionList timeComplete={this.timeComplete} userKey={this.state.userKey}/>
            </div>}
        </div>
      </Provider>
    );
  }
}

export default App;
