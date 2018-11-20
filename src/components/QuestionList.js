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
          q.optionOne.votes.includes(authedUser) === false &&
          q.optionTwo.votes.includes(authedUser) === false
      )
      .sort((a, b) => questions.timestamp - questions.timestamp),
    answeredQuestions: Object.values(questions)
      .filter(
        q =>
          q.optionOne.votes.includes(authedUser) ||
          q.optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions.timestamp - questions.timestamp)
  }
}
export default connect(mapStateToProps)(QuestionList)
