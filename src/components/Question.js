import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'


 class Question extends Component {
  render() {
    console.log(this.props.question)
    return (
      <div className='question'>
        
      </div>
    )
  }
}
 function mapStateToProps ({ users, questions, authedUser },{id}) {
  const question = questions.filter(b=>b.author!==authedUser)
  return {
    question: formatQuestion(question)
     
  }
}
 export default connect(mapStateToProps)(Question) 