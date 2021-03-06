import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Question from './Question'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import PageNotFound from './PageNotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <Route path='/Login' component={Login} />
            <Route path='/' exact component={Dashboard} />
            <Route path='/question/:id' component={Question} />
            <Route path='/add' component={NewPoll} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/PageNotFound' component={PageNotFound} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
