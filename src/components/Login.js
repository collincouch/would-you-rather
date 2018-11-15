import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    selectedOption: null,
    toHome: false
  }

  handleChange = selectedOption => {
    this.setState(() => ({
      selectedOption: selectedOption
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { selectedOption } = this.state
    const { dispatch } = this.props
    //Add AuthedUser to store
    dispatch(setAuthedUser(selectedOption.value))
    this.setState(() => ({
      selectedOption: null,
      toHome: true
    }))
  }
  render() {
    const { selectedOption, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const options = this.props.userIds.map(val => {
      return {
        value: val,
        label: val
      }
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Select
            value={selectedOption}
            options={options}
            onChange={this.handleChange}
            placeholder='Select a user'
          />
          <button type='submit' disabled={selectedOption === null}>
            Login
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  }
}
export default connect(mapStateToProps)(Login)
