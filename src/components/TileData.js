import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Print from '@material-ui/icons/Print';
import Categories from '@material-ui/icons/Power';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleList extends Component {
  openFile = (data) => {
    this.props.openFile(data)
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem onClick={() => this.openFile('TestManage')} button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Test Manage" />
          </ListItem>
          <ListItem onClick={() => this.openFile('QuestionBank')} button>
            <ListItemIcon>
              <Print />
            </ListItemIcon>
            <ListItemText primary="Question Bank" />
          </ListItem>
          <ListItem onClick={() => this.openFile('Reports')} button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem onClick={() => this.openFile('Categories')} button>
            <ListItemIcon>
              <Categories />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </div>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
