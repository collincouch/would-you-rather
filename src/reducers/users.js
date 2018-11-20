import { RECEIVE_USERS, SAVE_ANSWER } from '../actions/users'
 export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
       case SAVE_ANSWER :
    	
    	return{
    		...state,
    		//I need to change state of users  here too don't I to add the answer to the users?
    		//
	        [action.authedUser]: {
	          ...state[action.authedUser],
	          answers:
	          	{
	         ...state[action.authedUser].answers,
	            [action.qid]: action.answer
	          }
	        }


      
    	}
    default :
      return state
  }
}