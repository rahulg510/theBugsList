//import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
var axios = require('axios');

var React = require('react');

const Project = (props) => (
  <tr>
    <td>{props.project.projectName}</td>
    <td>{0}</td>
    <td>{props.project.users.length}</td>
    <td>{props.project.projectManager}</td>
    {/* <td>{props.exercise.description}</td>
    <td>{props.exercise.priority}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/project')
      .then(res => {
       this.setState({ projects: res.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deleteExercise = (id) => {
  //   axios.delete('http://localhost:5000/exercises/'+id)
  //     .then(response => { console.log(response.data)});

  //   this.setState({
  //     exercises: this.state.exercises.filter(el => el._id !== id)
  //   })
  // }

  projectList = () => {
    return this.state.projects.map(currentProject => {
      return <Project project={currentProject} />; //deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Project Name</th>
              <th>Open Bugs</th>
              <th>Users</th>
              <th>Project Manager</th>
            </tr>
          </thead>
          <tbody>
            {this.projectList()}
          </tbody>
        </table>
      </div>
    )
  }
}

const container = document.querySelector('#projects_list_container');
ReactDOM.render(<ProjectList/>, container);
