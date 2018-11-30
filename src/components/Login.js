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
    
    const selectedUser = {
      id:selectedOption.value.id,
      name:selectedOption.value.name,
      avatarURL: selectedOption.value.avatarURL,
    }

  
    dispatch(setAuthedUser(selectedUser))
    this.setState(() => ({
      selectedOption: null,
      toHome: true
    }))
  }
  render() {
    const { selectedOption, toHome } = this.state

    const { authedUser,users } = this.props

    if (authedUser !== null) {
      if (this.props.location.state.referrer !== '/') {
        return <Redirect to={this.props.location.state.referrer} />
      }

      if (toHome === true) {
        return <Redirect to='/' />
      }
    }

    const options = this.props.userIds.map(val => {
      return {
        value: Object.values(users).filter(person => person.id === val)[0],
        label: val
      }
    })

     
     
     
    return (
      <div className='center'>
      <h3>Login</h3>
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

function mapStateToProps({ users, authedUser }) {
  return {
    userIds: Object.keys(users),
    users:users,
    authedUser: authedUser
  }
}
export default connect(mapStateToProps)(Login)
