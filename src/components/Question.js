import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'
//import {vote} from '../actions/users'
import { Redirect } from 'react-router-dom'

class Question extends Component {
  state = {
    selectedOption: null,
    toHome: false
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
    const { dispatch, question, user } = this.props

    dispatch(
      handleSaveQuestionAnswer({
        qid: question.id,
        authedUser: user.id,
        answer: selectedOption
      })
    )

    //dispatch(vote({
    //  qid: question.id,
    //  authedUser: user.id,
    //  answer:selectedOption
    //}))

    this.setState(() => ({
      selectedOption: null,
      toHome: true
    }))
  }

  render() {
    const question = this.props.question
    const user = this.props.user
    const { id, author, optionOne, optionTwo } = question
    const answer = user.answers[id]
    const { selectedOption, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='question'>
            <div className='author'>Author: {author}</div>
            {answer ? (
              <div>
                <div
                  className={answer === 'optionOne' ? 'authedUserAnswer' : ''}
                >
                  {optionOne.text}
                </div>
                <div
                  className={answer === 'optionTwo' ? 'authedUserAnswer' : ''}
                >
                  {optionTwo.text}
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
            <div>Statistics here.</div>
          ) : (
            <button
              className='btn'
              type='submit'
              disabled={selectedOption === ''}
            >
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
  const user = users[authedUser]

  return {
    question: question,
    user: user
  }
}
export default connect(mapStateToProps)(Question)
