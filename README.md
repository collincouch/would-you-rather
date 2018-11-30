# Would You Rather Project

The Would You Rather project is an application that allows an authenticated user to:
 * Vote on option 1 or option 2
 * Create a new would you rather poll with two options
 * View the details on created polls
 * View a leaderboard for users that have created and answered polls

 * The application uses Redux and thus has actions, and reducers to manage application state

## Installation

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Description of the Files
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
	├── actions - This is the folder containing the action dispatchers for the authedUser, questions, and users state of state
		├── authedUser.js
		├── questions.js
		├── shared.js
		├── users.js
	├── components - These are the UI components of teh application
		├── App.js
		├── Dashboard.js
		├── Leaderboard.js
		├── Login.js
		├── Nav.js
		├── NewPoll.js
		├── PageNotFound.js
		├── Question.js
		├── QuestionListItem.js
		├── TabContainer.js
		├── UserListItem.js
	├── middleware
		├── index.js - this applys the thunk middle
		├── logger.js - loggs state to the browser console
	├── reducers -  this folder contains the reducers for the authedUser, questions, and users slices of state
		├── authedUser.js 
		├── index.js
		├── questions.js
		├── users.js
	├── utils
		├── _DATA.js - This serves as our database
		├── api.js - the api to access the _DATA.js file
		├── helpers.js - generic helper methods
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

