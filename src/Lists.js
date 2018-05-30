import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Result from './result';
import Data from './data.json';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: '',
      showButton: false,
      expanded: null,
      nextQuestion: 0,
      score: 0,
      answers: [],
      showResult: false,
    }
  }
  handleRadio = (event, checked) => {
    this.setState({
      value: event.target.value,
      showButton: true,
      score: this.state.score + 1,
      answers: this.state.answers.concat(event.target.value)
    });
  };

  handleButton = (index) => {
    console.log('button', index,)
    this.setState({
      showButton: false,
      nextQuestion: this.state.nextQuestion + 1,
      showResult: index === 9 ? true : false,
      open: index === 9 ? true : false,
      value: ''
    })
  }

  handleChange= (index) => {
    this.setState({
      nextQuestion: this.state.nextQuestion,
      showButton: false
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props;
    const { expanded, nextQuestion } = this.state;
    const childrens = Object.entries(Data).map(ch => ch[1]);
    const subChild = Object.entries(childrens[0]).map(ch => ch[1]);
    return (
      <div className={classes.root}>
      {subChild.map((ch, i) => {
        return (
        <ExpansionPanel expanded={ch.id === nextQuestion ? true : false } onChange={this.handleChange}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Question {i}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid item xs={12} sm={6}>
            <img src="" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2 className={classes.heading}>{ch.data.title}</h2>
            <FormControl component="fieldset" required>
              <RadioGroup
                aria-label="gender"
                name="questions"
                value={this.state.value}
                onChange={this.handleRadio}
              > {ch.data.options.map(option => <FormControlLabel value={option} control={<Radio />} label={option} />)}
              </RadioGroup>
              {this.state.showButton && <Button variant="raised" color="primary" onClick={() => this.handleButton(i)} >Next Question</Button>}
            </FormControl>
          </Grid>
           
          </ExpansionPanelDetails>
        </ExpansionPanel>)
      })}
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.showResult && <Result score={this.state.score} answers={this.state.answers} />}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);