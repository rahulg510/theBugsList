var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
var axios = require('axios');

var React = require('react');

var Project = function Project(props) {
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      props.project.projectName
    ),
    React.createElement(
      'td',
      null,
      0
    ),
    React.createElement(
      'td',
      null,
      props.project.users.length
    ),
    React.createElement(
      'td',
      null,
      props.project.projectManager
    )
  );
};

var ProjectList = function (_React$Component) {
  _inherits(ProjectList, _React$Component);

  function ProjectList(props) {
    _classCallCheck(this, ProjectList);

    var _this = _possibleConstructorReturn(this, (ProjectList.__proto__ || Object.getPrototypeOf(ProjectList)).call(this, props));

    _this.projectList = function () {
      return _this.state.projects.map(function (currentProject) {
        console.log(currentProject);
        return React.createElement(Project, { project: currentProject }); //deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
      });
    };

    _this.state = { projects: [] };
    return _this;
  }

  _createClass(ProjectList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      axios.get('http://localhost:3000/project').then(function (res) {
        console.log(res.data);
        _this2.setState({ projects: res.data });
      }).catch(function (error) {
        console.log(error);
      });
    }

    // deleteExercise = (id) => {
    //   axios.delete('http://localhost:5000/exercises/'+id)
    //     .then(response => { console.log(response.data)});

    //   this.setState({
    //     exercises: this.state.exercises.filter(el => el._id !== id)
    //   })
    // }

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Projects'
        ),
        React.createElement(
          'table',
          { className: 'table' },
          React.createElement(
            'thead',
            { className: 'thead-light' },
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                'Project Name'
              ),
              React.createElement(
                'th',
                null,
                'Open Bugs'
              ),
              React.createElement(
                'th',
                null,
                'Users'
              ),
              React.createElement(
                'th',
                null,
                'Project Manager'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            this.projectList()
          )
        )
      );
    }
  }]);

  return ProjectList;
}(React.Component);

var container = document.querySelector('#projects_list_container');
ReactDOM.render(React.createElement(ProjectList, null), container);