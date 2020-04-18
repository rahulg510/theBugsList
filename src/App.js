import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import IssueList from "./components/issues-list.component";
import CreateIssue from "./components/create-issue.component";
import CreateUser from "./components/create-user.component";
import EditIssue from './components/edit-issue.component';


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={IssueList} />
      {//<Route path="/login" exact component={ExercisesList} />
}
      <Route path="/edit/:id" component={EditIssue} />
      <Route path="/create" component={CreateIssue} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
