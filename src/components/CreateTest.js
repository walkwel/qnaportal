import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import { Table, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const enhance = compose(
  firebaseConnect(["questions"]),
  connect(({firebase}) => ({
    questions: firebase.data.questions
  }))
)

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

class CreateTest extends Component {
  constructor() {
    super();
    this.state = {
      tests: [],
      selected: false,
      createTest: []
    }
  }
  handleClick = (id) => {
    const quests = this.state.tests.map(q => {
      if(q.id === id){
        return {
          ...q,
          selected : q.selected ? !q.selected : true
        }
      }
      return q;
    })
    let question = quests.filter(data => data.selected === true ? data : '');
    this.setState({
      tests: quests,
      createTest: question
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.questions){
     this.setState({tests: nextProps.questions})
    }
  }
  drag = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  }
  onDragOver = (ev) => {
    ev.preventDefault();
  }
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tests.filter((task) => {
      if (task.id == id) {
          task.category = cat;
      }
      return task;
    })
    this.setState({
      ...this.state,
      tests: tasks
    });
  }
  
  render() {
    const { tests, selected, createTest } = this.state;
    const data = tests.filter(test => test.category === 'complete' ? test : '')
    if (this.state.tests === '') {
      return (
        <h3>No Data To Create Test</h3>
      )
    }
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Table>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={selected} />
                </TableCell>
                <TableCell>Index</TableCell>
                <TableCell>Question</TableCell>
              </TableRow>
              <TableBody>
                {tests ? tests.map(question => 
                <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox 
                    onClick={() => this.handleClick(question.id)}
                    checked={question.selected}
                  />
                  </TableCell>
                  <TableCell>
                    {question.id+1}
                  </TableCell>
                  <TableCell onDragStart={(event) => this.drag(event, question.id)} draggable="true">
                    {question.data['title']}
                    </TableCell>
                  </TableRow>
                  ): 'Loading. . . .'}
                </TableBody>
            </Table>
          </Grid>
            <Grid item xs={12} sm={6} style={{ border: '2px dotted rgba(0, 0, 0, 0.54)' }}>
            <Typography variant="display1" align='center' >Create Test</Typography>
            {data.length ? data.map(question => 
              <Grid container wrap="nowrap" 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "complete")}}
                spacing={24}>
                <Grid item xs={12} sm={6}>
                  <img src={question.data['img']} alt="Missing image" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div>
                    <Typography
                      variant="caption"
                      align="justify"
                      gutterBottom
                    >Q. {question.data['title']}</Typography>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        name=""
                        value=''
                        onChange={(e) => this.handleChange(e)}
                      >
                        {question.data['options'].map(data => <FormControlLabel value="option" key="option" control={<Radio color="primary" />} label={data} />)}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            ): (
              <Grid container 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "complete")}}
                wrap="nowrap">
                <Grid item sm={12}>
                  <Typography
                    variant="title"
                    align='center'
                    gutterBottom >Drop Your Questions Here!
                  </Typography>
                  </Grid>
                </Grid>
            )}
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default enhance(CreateTest);
