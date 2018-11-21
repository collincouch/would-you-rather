import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }
  handleChangeOptionOne = e => {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = e => {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props

    
    dispatch(handleAddPoll(optionOne, optionTwo))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>Would you rather...</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder='Option one'
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            className='textarea'
            maxLength={280}
          />
          <textarea
            placeholder='Option two'
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            className='textarea'
            maxLength={280}
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' && optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}
export default connect()(NewPoll)
