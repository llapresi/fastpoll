# Fastpoll

Fastpoll is a web app that allows users to create realtime polls. Fastpoll utilizes

* A React based frontend that allows users to create polls and vote on them. Voting updates in realtime via. short polling, allowing you to see incoming results. Developed using [Create React App](https://github.com/facebook/create-react-app), [React Router](https://reacttraining.com/react-router/), React Hooks and [Emotion styling](https://github.com/emotion-js/emotion)
* Client unit testing using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library)
* A backend service that implements a REST API for creating polls, retrieving them and voting on them, using [Express](https://expressjs.com/) for routing + REST requests and [Sequelize](https://sequelize.org/) as an ORM

## To Install + Run Locally
1. Run `npm install` in project root.
2. Run `npm install` in `client` folder.
3. Create a `.env` folder in project root to set DATABASE_URL (`mysql://` format) and PORT for sever (recomend 4000)
4. Set `{"proxy": "http://localhost:XXXX"}` in `client/package.json` to same port as your .env server port
5. Run `npm run dev` to run both server and client in watch mode.

## Known Issues

* Styling is threadbare and minimal although it is responsive to mobile screens
*	No system to prevent duplicate voting after refreshing the page. Currently this is so that testing is easier but event either an account or IP address way of preventing this will be implemented
* No unit/integration tests for REST server
