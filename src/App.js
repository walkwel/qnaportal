import React, { Component } from 'react';
import Questions from './questions';
import List from './QuestionList'



import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <List />
      </div>
    );
  }
}

export default App;
