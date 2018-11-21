import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import { Redirect } from 'react-router-dom'


 class Dashboard extends Component {
  render() {
    const {authedUser} = this.props

   if (authedUser === null) {
   
    //return <Redirect to='/Login' />
      return <Redirect
        to={{
          pathname: "/Login",
          search: "?utm=your+face",
          state: { referrer: Dashboard }
        }}
      />
    }

    return (
      <div>
       <a href="add">New Poll</a>
        <h3 className='center'>Would you rather</h3>
        <QuestionList status='notanswered'/>
        
      </div>
    )
  }
}
 function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser
     
  }
}
 export default connect(mapStateToProps)(Dashboard) 