import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Send';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase';
import Avatar from '@material-ui/core/Avatar';
import myAvatar from './assets/my-avatar.svg';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 160,
    height: 160,
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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      disableButton: true,
      key: '',
    }
  }
  handleChange = (event) => {
    this.setState({
      userName : event.target.value,
      disableButton: false
    })
  }
  registerUser = (event) => {
    event.preventDefault()
    let timestamp = new Date().getTime();
    const data = `${timestamp}-${this.state.userName}`
    this.props.firebase.set(`users/${data}`, {userName : this.state.userName, timestamp :timestamp})
    .then(() => {
      this.setState({
        key: data
      })
      this.props.enteredUser(this.state.key)
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.margin}>
        <form onSubmit={this.registerUser} style={{ marginTop: '8rem' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Avatar
                alt="Adelle Charles"
                src={myAvatar}
                className={classes.bigAvatar}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={8} direction="row" justify="center" alignItems="center">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField autoFocus={true} onChange={this.handleChange} id="input-with-icon-grid" label="May i know your Name!" />
              <Button disabled={this.state.disableButton} color="primary" variant="fab" mini type="submit"><AddIcon /></Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  enhance(withStyles(styles)(User));
