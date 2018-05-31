import React, { Component } from 'react';
import paragraph from '@material-ui/core/Typography'
import QuestionList from './QuestionList'



import './App.css';
import { Typography } from '@material-ui/core';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Typography variant="display3" color="primary" align="center" >
          NUMERICAL REASONING
        </Typography>
        <QuestionList />
      </div>
    );
  }
}

export default App;
