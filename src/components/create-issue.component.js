import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueName: '',
      description: '',
      priority: "",
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeIssueName = (e) => {
    this.setState({
      issueName: e.target.value
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onChangePriority = (e) => {
    this.setState({
      priority: e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const issue = {
      issueName: this.state.issueName,
      description: this.state.description,
      priority: this.state.priority,
      date: this.state.date
    }

    console.log(issue);

    axios.post('http://localhost:5000/issues/add', issue)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Issue Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Assign to: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.users}
              onChange={this.onChangeIssueName}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Priority: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.priority}
              onChange={this.onChangePriority}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Issue Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}