import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionSummary from './QuestionSummary'

class QuestionList extends Component {
  render() {
    const unAnsweredQuestions = this.props.notAnsweredQuestions
    const answeredQuestions = this.props.answeredQuestions
    return (
      <div>
        <h3>Unanswered Questions</h3>
        <ul>
          {unAnsweredQuestions.map(q => (
            <li key={q.id}>
              <QuestionSummary id={q.id} />
            </li>
          ))}
        </ul>

        <h3>Answered Questions</h3>
        <ul>
          {answeredQuestions.map(q => (
            <li key={q.id}>
              <QuestionSummary id={q.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
function mapStateToProps({ users, questions, authedUser }) {
  return {
    notAnsweredQuestions: Object.values(questions)
      .filter(
        q =>
          q.optionOne.votes.includes(authedUser.id) === false &&
          q.optionTwo.votes.includes(authedUser.id) === false
      )
      .sort((a, b) => b.timestamp - a.timestamp),
    answeredQuestions: Object.values(questions)
      .filter(
        q =>
          q.optionOne.votes.includes(authedUser.id) ||
          q.optionTwo.votes.includes(authedUser.id)
      )
      .sort((a, b) => b.timestamp - a.timestamp)
  }
}
export default connect(mapStateToProps)(QuestionList)
