import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './stylein.css'


class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-back navbar-expand-lg">
        <Link to="/" className="navbar-brand navbar-font">theBugsList</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link navbar-font">Issues</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link navbar-font">Log New Issue</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link navbar-font">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

ReactDOM.render(this, document.getElementById("page-top"));