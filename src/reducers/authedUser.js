import { SET_AUTHED_USER, LOGOUT } from '../actions/authedUser'
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        id: action.id,
        name: action.name,
        avatarURL: action.avatarURL
      }
    case LOGOUT:
      return null
    default:
      return state
  }
}
