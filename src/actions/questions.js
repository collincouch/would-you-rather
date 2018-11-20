import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}


export function handleSaveQuestionAnswer (info) {
  return (dispatch) => {
     dispatch(vote(info))
     return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer: ', e)
        dispatch(vote(info))
        alert('There was an error saving your answer. Try again.')
      })
    }
}

 function addQuestion(question){
	return{
		type:ADD_QUESTION,
		question,
	}
}


function vote({qid,authedUser,answer}){
	return{
		type:SAVE_QUESTION_ANSWER,
		qid,
		authedUser,
		answer
	}
}




