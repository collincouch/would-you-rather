import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import CheckCircle from '@material-ui/icons/CheckCircle'
import PageNotFound from './PageNotFound'

class Question extends Component {
  state = {
    selectedOption: null,
  }

  handleOptionChange = selectedOption => {
    const optionValue = selectedOption.target.value
    this.setState(() => ({
      selectedOption: optionValue
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { selectedOption } = this.state
    const { dispatch, question, authedUser } = this.props

    dispatch(
      handleSaveQuestionAnswer({
        qid: question.id,
        authedUser: authedUser,
        answer: selectedOption
      })
    )


    this.setState(() => ({
      selectedOption: null,
    }))
  }

  render() {
    const question = this.props.question
    const user = this.props.user
    if (user === null) {
      //console.log(this.props.location.pathname)
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

    if (!question) {
      return <PageNotFound />
    }

    const { id, author, optionOne, optionTwo } = question

    const answer = user.answers[id]
    const { selectedOption} = this.state

    const avatarURL = this.props.avatarURL

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='question'>
            <div className='author'>
              <Avatar alt={author} src={avatarURL} />
              Author: {author}
            </div>
            <div>
              <h2>Would you rather...</h2>
            </div>
            {answer ? (
              <div>
                <div>
                  {optionOne.text}{' '}
                  {answer === 'optionOne' ? (
                    <CheckCircle color='primary' />
                  ) : (
                    ' '
                  )}
                  <br />
                  Total Votes: {optionOne.votes.length}
                  <br />
                  Percentage:{' '}
                  {Math.floor((optionOne.votes.length /
                    (optionOne.votes.length + optionTwo.votes.length)) * 100)}
                  %
                </div>
                <p>or</p>
                <div>
                  {optionTwo.text}{' '}
                  {answer === 'optionTwo' ? (
                    <CheckCircle color='primary' />
                  ) : (
                    ' '
                  )}
                  <br />
                  Total Votes: {optionTwo.votes.length}
                  <br />
                  Percentage:{' '}
                  {Math.floor((optionTwo.votes.length /
                    (optionOne.votes.length + optionTwo.votes.length)) * 100)}
                  %
                </div>
              </div>
            ) : (
              <div>
                <div className='radio'>
                  <label>
                    <input
                      type='radio'
                      value='optionOne'
                      checked={this.state.selectedOption === 'optionOne'}
                      onChange={this.handleOptionChange}
                    />
                    {optionOne.text}
                  </label>
                </div>
                <div className='radio'>
                  <label>
                    <input
                      type='radio'
                      value='optionTwo'
                      checked={this.state.selectedOption === 'optionTwo'}
                      onChange={this.handleOptionChange}
                    />
                    {optionTwo.text}
                  </label>
                </div>
              </div>
            )}
          </div>
          {answer ? (
            <div>
              <p>
                Return <Link to='/'>Home</Link>
              </p>
            </div>
          ) : (
            <button
              className='btn'
              type='submit'
              disabled={selectedOption === ''}>
              Submit
            </button>
          )}
        </form>
      </div>
    )
  }
}
function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const user = authedUser !== null ? users[authedUser.id] : null

  const avatarURL =
    Object.values(users).length !== 0 && question!==undefined
      ? Object.values(users).filter(person => person.id === question.author)[0]
          .avatarURL
      : ''

  return {
    question: question,
    user: user,
    authedUser: authedUser,
    avatarURL: avatarURL
  }
}
export default connect(mapStateToProps)(Question)
