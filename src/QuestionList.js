import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
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



class VerticalLinearStepper extends React.Component {
  constructor() {
    super();
    this.state = {
      questions : Data.questions,
      activeStep: 0,
      value: '',
      answers: [],
      showButton: false,
    };
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      showButton: false
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = (event, index) => {
    const quests = this.state.questions;
    quests[index]['checked'] = event.target.value;
    this.setState({
      questions : quests,
      showButton: true,
    })
  };

  render() {
    const { classes } = this.props;
    const { activeStep, value,questions } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {questions.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>Question {index}</StepLabel>
                <StepContent>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <img src={One} alt="Missing image" style={{ maxWidth: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="headline" align="justify" color="primary" paragraph={true} gutterBottom>Q. {questions[index].data.title}</Typography>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        name="questions"
                        className={classes.group}
                        value={label.checked ? label.checked : ''}
                        onChange={(e) => this.handleChange(e, index)}
                      >
                        {questions[index].data.options.map(option => <FormControlLabel value={option} control={<Radio color="primary" />} label={option} />)}
                      </RadioGroup>
                    </FormControl>
                    <div className={classes.actionsContainer}>
                      <div>
                        {this.state.showButton &&
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
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
            );
          })}
        </Stepper>
        {activeStep === questions.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <List component="nav">
                {questions.map((ans, index) => (
                  <ListItem button>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={ans.data.title} secondary={ans.checked} />
                  </ListItem>
                ))}
            </List>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
