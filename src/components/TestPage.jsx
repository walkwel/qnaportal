import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import QuestionList from '../QuestionList';
import '../App.css';
import User from '../User';

class TestPage extends Component {
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
      <div className="App">
        {this.state.userKey === null ? <User enteredUser={this.showList} /> : 
          <div>
            <Typography variant="display3" color="primary" align="center" >NUMERICAL REASONING</Typography>
            <QuestionList timeComplete={this.timeComplete} userKey={this.state.userKey}/>
          </div>}
      </div>
    );
  }
}

export default TestPage;
