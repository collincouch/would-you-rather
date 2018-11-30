import React, { Component }from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleUserLogout } from '../actions/authedUser'
import { NavLink, Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'

const styles = theme =>( {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
   button: {
    margin: theme.spacing.unit,
  },
});

class Nav extends Component {
state = {
   
    anchorEl: null,
  };

 

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  handleLogout = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleUserLogout())
  }

  render() {
    const { authedUser} = this.props
    const classes = this.props

    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

      return (
        <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>
           
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Would you rather
            </Typography>
            {authedUser && (

              

              <div>
              <Button component={Link} to="/" className={classes.button}>
        Home
      </Button>
      <Button component={Link} to="/add" className={classes.button}>
        New Poll
      </Button>
      <Button component={Link} to="/leaderboard" className={classes.button}>
        Leaderboard
      </Button>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt={authedUser.name} src={authedUser.avatarURL} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>{authedUser.name}</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
    </div>
      )
   
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser
  }
}
export default withStyles(styles)(connect(mapStateToProps)(Nav))