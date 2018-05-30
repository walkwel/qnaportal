import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button'

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: 'female',
      showButton: false,
    }
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  handleChange = event => {
    this.setState({ value: event.target.value,
      showButton: !this.state.showButton });
  };
  handleButton = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    return (
      <div>
        <List>
          <ListItem button onClick={this.handleClick}>
            <p>Which period saw the greatest percentage decrease isasn water prices?</p>
            <ListItemText inset />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormControl component="fieldset" required>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                  <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="(Disabled option)"
                  />
                </RadioGroup>
              </FormControl>
            </List>
            {this.state.showButton && <Button variant="raised" color="primary" onClick={this.handleButton} >Next Question</Button>}
          </Collapse>
        </List>
      </div>
    )
  }
}
