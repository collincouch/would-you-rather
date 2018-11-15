import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'


 class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
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