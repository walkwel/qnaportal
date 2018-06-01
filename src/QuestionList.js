import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepIcon from '@material-ui/core/StepIcon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid'

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase';
import { firebase as firebaseConf } from './config';


import Data from "./data.json";
import One from './assets/1.gif';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 20,
    marginLeft: theme.spacing.unit * 50,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

const enhance = compose(
  firebaseConnect([
    "questions"
  ]),
  connect(({firebase}, props) => ({
    questions: firebase.data.questions,
  }))
)

let score = 0;

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions : this.props.test,
      activeStep: 0,
      value: '',
      answers: [],
      showButton: false,
      score: 0,
    };
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      showButton: false,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  submitResult = () => {
    let data = {}
    this.props.questions.forEach(quest => {
      data[quest.id.toString()] = {'title': quest.data.title, 'answer': quest.checked}
    });
    let result = this.state.score*10
    this.props.firebase.set(`users/${this.props.userKey}/score`, `${result}`)
  }

  handleChange = (event, index) => {
    const quests = this.props.questions;
    quests[index]['checked'] = event.target.value;
    console.log('data', quests)
    this.props.firebase.set(`users/${this.props.userKey}/submission/q${index+1}`, {'timestamp': Date.now(), 'answer': event.target.value})
    // this.props.firebase.push('submission', {"q1":'123',"score":20});
    // let dbCon = this.props.firebase.database().ref('/submission');
    // dbCon.push({
    //   message: event.target.value
    // });
    // this.props.firebase.push(`users/${this.props.userKey}/submission/${quest.id}`, data)
    if (quests[index].checked === quests[index].data.correctAnswer) {
      score++
    }
    this.setState({
      questions : quests,
      showButton: true,
      score: score,
    })
  };

  render() {
    const { classes, questions } = this.props;
    const { activeStep, value, score, showError } = this.state;
    return (
      <div className={classes.root}>
        
          {isLoaded(questions)
          ? <Stepper activeStep={activeStep} orientation="vertical">
            {questions.map((label, index) => (
              <Step key={label}>
                <StepLabel>Question {index+1}</StepLabel>
                <StepContent>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <img src={One} alt="Missing image" style={{ maxWidth: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="title" align="justify" gutterBottom>Q. {questions[index].data.title}</Typography>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        name="questions"
                        className={classes.group}
                        value={label.checked ? label.checked : ''}
                        onChange={(e) => this.handleChange(e, index)}
                      >
                        {questions[index].data.options.map(option => <FormControlLabel value={option}  control={<Radio color="primary" />} label={option} />)}
                      </RadioGroup>
                    </FormControl>
                    <div className={classes.actionsContainer}>
                      <div>
                        {this.state.showButton &&
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={activeStep === questions.length - 1 ? this.submitResult :this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                        </Button>}
                      </div>
                    </div>
                  </Grid>
                </Grid>
                </StepContent>
              </Step>
            ))}
            </Stepper>
          : ''
        }
        
        {isLoaded(questions)
        ? activeStep === questions.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <List component="nav">
                <h1>Your Score: {(score/10)*100}%</h1>
                {questions.map(ans => {
                  return (
                  <ListItem style={{ backgroundColor: ans.data.correctAnswer === ans.checked ? '' : 'indianred' }} button>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={ans.data.title} secondary={ans.checked} />
                  </ListItem>
                )})}
            </List>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )
      : ''}
      </div>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object,
};

export default enhance(withStyles(styles)(QuestionList));
