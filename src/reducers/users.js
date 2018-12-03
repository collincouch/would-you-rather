import { RECEIVE_USERS } from "../actions/users"
import { ADD_POLL,SAVE_QUESTION_ANSWER } from "../actions/questions"
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser.id]: {
          ...state[action.authedUser.id],
          answers: {
            ...state[action.authedUser.id].answers,
            [action.qid]: action.answer
          }
        }
      }
    case ADD_POLL:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      }
    default:
      return state
  }
}
