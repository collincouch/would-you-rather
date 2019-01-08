import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import List from '@material-ui/core/List'
import QuestionListItem from './QuestionListItem'
import Typography from '@material-ui/core/Typography'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

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

class Dashboard extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const {
      authedUser,
      classes,
      unAnsweredQuestions,
      answeredQuestions
    } = this.props

    const { value } = this.state

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
      <div className="center">
        <h3 className="center">Would you rather</h3>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Unanswered Polls" />
              <Tab label="Answered Polls" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <List className={classes.root}>
                {unAnsweredQuestions.map(q => (
                  <QuestionListItem key={q.id} id={q.id} />
                ))}
              </List>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <List className={classes.root}>
                {answeredQuestions.map(q => (
                  <QuestionListItem key={q.id} id={q.id} />
                ))}
              </List>
            </TabContainer>
          )}
        </div>
      </div>
    )
  }
}
function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser: authedUser,
    unAnsweredQuestions:
      authedUser !== null
        ? Object.values(questions)
            .filter(
              q =>
                q.optionOne.votes.includes(authedUser.id) === false &&
                q.optionTwo.votes.includes(authedUser.id) === false
            )
            .sort((a, b) => b.timestamp - a.timestamp)
        : null,
    answeredQuestions:
      authedUser !== null
        ? Object.values(questions)
            .filter(
              q =>
                q.optionOne.votes.includes(authedUser.id) ||
                q.optionTwo.votes.includes(authedUser.id)
            )
            .sort((a, b) => b.timestamp - a.timestamp)
        : null
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(connect(mapStateToProps)(Dashboard))
