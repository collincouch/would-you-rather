import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import UserListItem from './UserListItem'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
})

class Leaderboard extends Component {
  questionsAsked = user => {
    return user.questions.length
  }

  questionsAnswered = user => {
    return Object.keys(user.answers).length
  }

  totalQuestions = user => {
    return this.questionsAnswered(user) + this.questionsAsked(user)
  }

  //Credit to ruben for the sorting function.  I was running out of time on this
  //project and used his code on this page. this can be found at
  //https://github.com/rubeun/react-exercises/blob/master/would-you-rather/src/components/Leaderboard.js
  sortUsersByTotalQuestions = users => {
    let sorted = []
    for (let user in users) {
      sorted.push([
        user,
        this.totalQuestions(users[user]),
        this.questionsAsked(users[user]),
        this.questionsAnswered(users[user]),
        users[user].avatarURL
      ])
    }
    sorted.sort(function(a, b) {
      return b[1] - a[1]
    })
    return sorted
  }

  render() {
    const { authedUser, classes, users } = this.props
    const orderedUsernameArray = this.sortUsersByTotalQuestions(users)
    console.log('Ordered Usernames', orderedUsernameArray)

    if (authedUser === null) {
      //return <Redirect to='/Login' />
      return (
        <Redirect
          to={{
            pathname: '/Login',
            //search: "?utm=your+face",
            state: { referrer: this.props.location.pathname }
          }}
        />
      )
    }

    return (
      <div className='center'>
        <h3>Leaderboard</h3>
        <List className={classes.root}>
          {orderedUsernameArray.map(user => (
            <UserListItem
              key={user[0]}
              name={user[0]}
              avatarURL={user[4]}
              totalQuestionsAsked={user[2]}
              totalQuestionsAnswered={user[3]}
            />
          ))}
        </List>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapStateToProps)(Leaderboard))
