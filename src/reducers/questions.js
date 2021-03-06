import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, ADD_POLL  } from '../actions/questions'
 export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SAVE_QUESTION_ANSWER :
    	
    	return{
    		...state,
    		[action.qid]:{
    			...state[action.qid],
    			[action.answer]:{
    				...state[action.qid][action.answer],
    				votes: state[action.qid][action.answer].votes.includes([action.authedUser.id])
    					? state[action.qid][action.answer].votes((uid)=>uid!==action.authedUser.id)
    					: state[action.qid][action.answer].votes.concat([action.authedUser.id])
    			}
    		}
    	}
     case ADD_POLL :
      
      return{
        ...state,
          [action.question.id]: action.question
        }
     



    default :
      return state
  }
}