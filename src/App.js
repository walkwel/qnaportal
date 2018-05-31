import React, { Component } from 'react';
import Questions from './questions';
import List from './QuestionList'



import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1 className="App-intro">
          NUMERICAL <code>REASONING</code>.
        </h1>
        <List />
      </div>
    );
  }
}

export default App;
