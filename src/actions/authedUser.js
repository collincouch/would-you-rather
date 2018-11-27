export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'

export function setAuthedUser({id,name,avatarURL}) {
	
  return {
    type: SET_AUTHED_USER,
    id,
    name,
    avatarURL
  }
}

export function handleUserLogout(){
  return{
    type: LOGOUT
  }
}
