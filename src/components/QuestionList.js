import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


 class QuestionList extends Component {
  render() {
    console.log(this.props.notAnsweredQuestionIds)
    return (
      <div>
        <h3>Question List</h3>
        
      </div>
    )
  }
}
 function mapStateToProps ({ users, questions, authedUser }) {

  //const notAnsweredQuestionIds = Object.questions.filter(q=>q.author!==authedUser)

  return {
    notAnsweredQuestionIds: Object.questions.filter((q)=>q.author!==authedUser)


     
  }
}
 export default connect(mapStateToProps)(QuestionList) 