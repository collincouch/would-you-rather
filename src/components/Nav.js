import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { handleUserLogout } from '../actions/authedUser'

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleUserLogout())
  }

  render() {
    const { authedUser } = this.props

    if (authedUser !== null) {
      return (
        <nav className='nav'>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                New Poll
              </NavLink>
            </li>
            <li>
              <NavLink to='/Leaderboard' activeClassName='active'>
                Leaderboard
              </NavLink>
            </li>
            <li>
              <img
                src={authedUser.avatarURL}
                alt={`Avatar of ${authedUser.name}`}
                className='avatar'
              />
              {authedUser.name}
            </li>
            <li>
              <button type='button' onClick={this.handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )
    } else return null
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser
  }
}
export default connect(mapStateToProps)(Nav)
