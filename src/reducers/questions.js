import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER  } from '../actions/questions'
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
    				votes: state[action.qid][action.answer].votes.includes([action.authedUser])
    					? state[action.qid][action.answer].votes((uid)=>uid!==action.authedUser)
    					: state[action.qid][action.answer].votes.concat([action.authedUser])
    			}
    		},

    		//I need to change state of users  here too don't I to add the answer to the users?
    		//
	        //[action.authedUser]: {
	        //  ...state[action.authedUser],
	        //  answers:
	        //  	{
	        // ...state[action.authedUser].answers,
	        //    [action.qid]: action.answer
	        //  }
	        //}


      
    	}
    default :
      return state
  }
}