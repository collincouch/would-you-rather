import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'


const UserListItem = props => {
  const { name, avatarURL, totalQuestionsAsked, totalQuestionsAnswered } = props

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt='{name}' src={avatarURL} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            Asked: {totalQuestionsAsked} : Answered: {totalQuestionsAnswered}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

UserListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  totalQuestionsAsked: PropTypes.number.isRequired,
  totalQuestionsAnswered: PropTypes.number.isRequired
}

export default UserListItem
