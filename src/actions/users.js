export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function vote({ qid, authedUser, answer }) {
  return {
    type: SAVE_ANSWER,
    qid,
    authedUser,
    answer
  }
}
