import React from 'react';
import PropTypes from 'prop-types';
import ReactCountdownClock from 'react-countdown-clock'
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
import Slide from '@material-ui/core/Slide';
import Dialog from "@material-ui/core/Dialog";
import { compose } from 'redux';
import { connect } from 'react-redux';
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
      takenTime: '',
      currentTime: 0,
      dialog: false,
    };
  }
  componentDidMount() {
    this.setState({
      currentTime: Date.now()
    })
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
    this.setState({
      activeStep: this.state.activeStep + 1,
      showButton: false,
    });
    let data = {}
    this.props.questions.forEach(quest => {
      data[quest.id.toString()] = {'title': quest.data.title, 'answer': quest.checked}
    });
    let result = this.state.score*10
    this.props.firebase.set(`users/${this.props.userKey}/score`, `${result}`)
    this.props.firebase.set(`users/${this.props.userKey}/totalTime`, this.state.takenTime)
  }

  handleChange = (event, index) => {
    const quests = this.props.questions;
    quests[index]['checked'] = event.target.value;
    // this.props.firebase.push('submission', {"q1":'123',"score":20});
    // let dbCon = this.props.firebase.database().ref('/submission');
    // dbCon.push({
    //   message: event.target.value
    // });
    //this.props.firebase.push(`users/${this.props.userKey}/submission/${quest.id}`, data)
    if (quests[index].checked === quests[index].data.correctAnswer) {
      score++
    }
    let timeTaken = parseInt((Date.now()- this.state.currentTime)/1000);
    this.setState({
      questions : quests,
      showButton: true,
      score: score,
      takenTime: timeTaken <= 60 ? `${timeTaken} sec` : `${(timeTaken)/60} min`
    })
    this.props.firebase.set(`users/${this.props.userKey}/submission/q${index+1}`, {'timestamp': Date.now(), 'answer': event.target.value})
  };

  myCallback = (event) => {
    this.setState({
      dialog: true
    })
    let result = this.state.score*10
    this.props.firebase.set(`users/${this.props.userKey}/score`, `${result}`)
  }
  
  render() {
    const { classes, questions } = this.props;
    const { activeStep, value, score, showError, minutes } = this.state;
    console.log('object', this.props.questions)
    return (
      <div className={classes.root}>
        <div style={{ position: 'fixed', right: 0 }}>
          <ReactCountdownClock
            seconds={20}
            color="#3f51b5"
            alpha={0.9}
            size={100}
            paused={this.state.activeStep === 10 ? true : false}
            onComplete={this.myCallback} />
        </div>
          {<Stepper activeStep={activeStep} orientation="vertical">
            {questions && questions.map((label, index) => (
              <Step key={label}>
                <StepLabel>Question {index+1}</StepLabel>
                <StepContent>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <img src={label.data.img} alt="Missing image" style={{ maxWidth: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="title" align="justify" gutterBottom>Q. {label.data.title}</Typography>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        name="questions"
                        className={classes.group}
                        value={label.checked ? label.checked : ''}
                        onChange={(e) => this.handleChange(e, index)}
                      >
                        {label.data.options.map(option => <FormControlLabel value={option} key={option} control={<Radio color="primary" />} label={option} />)}
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
          
        }
        
        {activeStep === questions.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
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
          </Paper>
        )}
        <Dialog
          fullScreen
          open={this.state.dialog}
          TransitionComponent={Transition}
        >
          <div style={{ textAlign: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="-70 2 220 220">
              <path fill="#428bc1" d="M47.8 2L35.2 21h6.3L54.1 2z"/>
              <path fill="#e8e8e8" d="M41.5 2L28.8 21h6.4L47.8 2z"/>
              <path fill="#ed4c5c" d="M35.2 2L22.5 21h6.3L41.5 2z"/>
              <path fill="#ffc200" d="M20.4 16.8c-.6 0-1.1.5-1.1 1.1v9.5c0 .6.5 1.1 1.1 1.1h23.2c.6 0 1.1-.5 1.1-1.1v-9.5c0-.6-.5-1.1-1.1-1.1H20.4m22.1 7.3c0 .6-.5 1.1-1.1 1.1h-19c-.6 0-1.1-.5-1.1-1.1v-4.2c0-.6.5-1.1 1.1-1.1h19c.6 0 1.1.5 1.1 1.1v4.2"/>
              <path fill="#ed4c5c" d="M22.5 21h6.3L16.2 2H9.9z"/>
              <path fill="#e8e8e8" d="M28.8 21h6.4L22.5 2h-6.3z"/>
              <path fill="#3e4347" d="M33.1 5.2l-3.2 4.7L37.3 21h4.2l1-1.6z" opacity=".5"/>
              <path fill="#428bc1" d="M35.2 21h6.3L28.8 2h-6.3z"/>
              <circle cx="32" cy="42.3" r="19.7" fill="#ffc200"/>
              <path fill="#e68a00" d="M32.3 24.4c-10.1 0-18.2 8.2-18.2 18.2 0 3 .7 5.8 2 8.3-.6-2-1-4.1-1-6.3 0-10.7 8.2-19.4 18.7-20.2h-1.5"/>
              <path fill="#ffe394" d="M46 31c5.1 9 2.5 20.6-6.4 26.5-1.8 1.2-3.8 2.1-5.8 2.7 2.8-.3 5.5-1.3 8-3 8.4-5.6 10.6-16.8 5.1-25L46 31"/>
              <path fill="#f2b200" d="M32 34.3v-6.4l-3.2 10 1.4 1.8z"/>
              <path fill="#e68a00" d="M33.8 39.7l1.4-1.8-3.2-10v6.4z"/>
              <path fill="#c47500" d="M34.8 43l2.4 1.1 8.5-6.2-6.3 1.8z"/>
              <path fill="#ffe394" d="M39.4 39.7l6.3-1.8H35.2l-1.4 1.8z"/>
              <path fill="#ffd252" d="M30.2 39.7l-1.4-1.8H18.3l6.3 1.8z"/>
              <path fill="#ffdb75" d="M24.6 39.7l-6.3-1.8 8.4 6.2 2.5-1.1z"/>
              <path fill="#e68a00" d="M34.8 43l1.8 5.4 3.9 5.7-3.3-10z"/>
              <g fill="#f2b200">
                  <path d="M32 45.1v2.8l8.5 6.2-3.9-5.7zM29.2 43l-2.5 1.1-3.2 10 3.9-5.7z"/>
              </g>
              <path fill="#e68a00" d="M27.4 48.4l-3.9 5.7 8.5-6.2v-2.8z"/>
              <path fill="#ffce31" d="M33.8 39.7L32 34.3l-1.8 5.4h-5.6l4.6 3.3-1.8 5.4 4.6-3.3 4.6 3.3-1.8-5.4 4.6-3.3z"/>
            </svg>
            <Typography variant='display2'>Your Time Is Over</Typography>
            <Typography variant='headline'>Atempted Questions: {questions.filter(question => question.checked).length}</Typography>
          </div>
        </Dialog>
      </div>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object,
};

export default enhance(withStyles(styles)(QuestionList));
