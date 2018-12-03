import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_POLL = 'ADD_POLL'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleSaveQuestionAnswer(info) {
  return dispatch => {
    dispatch(vote(info))
    //dispatch(updateUser(info))
    return saveQuestionAnswer(info).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer: ', e)
      dispatch(vote(info))
      //dispatch(updateUser(info))
      alert('There was an error saving your answer. Try again.')
    })
  }
}

function addPoll(question) {
  return {
    type: ADD_POLL,
    question,
  }
}
export function handleAddPoll(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser.id
    })
      .catch(e => {
        console.warn('Error in handleAddPoll: ', e)
      })
      .then(question => dispatch(addPoll(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function vote({ qid, authedUser, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    qid,
    authedUser,
    answer
  }
}

