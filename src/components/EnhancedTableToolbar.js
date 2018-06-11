import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddQuestion from '@material-ui/icons/AddBox';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';


const byPropKey = (propertyName, value) => ({
  [propertyName]: value,
});

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      addedQuestion: '',
      addedCorrectAnswer: '',
      addedImage: '',
      radioValue: ''
    }
  }
  addQuestion = () => {
    this.setState({
      open: true
    })
  }
  onSubmit = (event) => {
    event.preventDefault();
    let question = [this.props.questions]
    console.log('object', this.state)
    // this.props.addQuestion(this.state.addedQuestion, Object.keys(question[0]).length);
    this.setState({
      open: false,
      addedQuestion: '',
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    const { numSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Question Bank
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add Question">
              <IconButton aria-label="Filter list">
                <AddQuestion onClick={this.addQuestion} />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Question Title"
                type="text"
                value={this.state.addedQuestion}
                onChange={event => this.setState(byPropKey('addedQuestion', event.target.value))}
                fullWidth
              />
              <TextField
                margin="dense"
                id="name"
                label="Correct Answer"
                type="text"
                value={this.state.addedCorrectAnswer}
                onChange={event => this.setState(byPropKey('addedCorrectAnswer', event.target.value))}
                fullWidth
              />
              <FormControl fullWidth>
                <label style={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.54)', padding: '10px' }}>
                  <AddAPhoto />
                  <input style={{ display: 'none' }} type="file" onChange={event => this.setState(byPropKey('addedImage', event.target.files[0].name))}/>
                </label>
              </FormControl>
              <FormControl style={{ width: 100 }}>
                <FormLabel>Answer Type</FormLabel>
                <RadioGroup
                  value={this.state.radioValue}
                  onChange={event => this.setState(byPropKey('radioValue', event.target.value))} 
                >
                  <FormControlLabel value="textarea" control={<Radio />} label="TextArea" />
                  <FormControlLabel value="radio" control={<Radio />} label="Radio" />
                  <FormControlLabel value="checkbox" control={<Radio />} label="Checkbox" />
                </RadioGroup>
              </FormControl>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
            </form>
          </DialogContent>
          
        </Dialog>
      </Toolbar>
    );
  }

};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default EnhancedTableToolbar;
