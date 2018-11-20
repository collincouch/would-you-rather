import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


 class QuestionSummary extends Component {
  render() {
    const question = this.props.question
    //const id = this.props.id
     const {
      id, author,optionOne, optionTwo
    } = question

    
    return (
      <div className='question'>
      <Link to={`/question/${id}`}>
        View Details
      </Link>
        
        <div className='author'>{author}</div>
        <div className='author'>{optionOne.text}</div>
        <div className='author'>{optionTwo.text}</div>
      </div>
    )
  }
}
 function mapStateToProps ({ users, questions, authedUser },{id}) {
  const question = questions[id]
  return {
    question: question
     
  }
}
 export default connect(mapStateToProps)(QuestionSummary) 