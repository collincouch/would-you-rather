import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
       <div>
          	  <Route path="/" exact component={Dashboard} />
              <Route path="/Login" component={Login} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser,
    loading: authedUser===null
  }
}
 export default connect(mapStateToProps)(App) 