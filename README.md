# Fastpoll

Fastpoll is a web app that allows users to create real-time polls. Fastpoll utilizes

* A React based frontend that allows users to create polls and vote on them. Voting updates in real-time using [Pusher](https://pusher.com), allowing you to see incoming results. Developed using [Create React App](https://github.com/facebook/create-react-app), [React Router](https://reacttraining.com/react-router/), React Hooks, [Emotion styling](https://github.com/emotion-js/emotion) and [GSAP](https://greensock.com/gsap/).
* Client unit testing using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library)
* A backend service that implements a REST API for creating polls, retrieving them and voting on them, using [Express](https://expressjs.com/) for routing + REST requests and [Sequelize](https://sequelize.org/) as an ORM
* Server unit testing using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/), and [Sequelize Test Helpers](https://github.com/davesag/sequelize-test-helpers)

## Install + Run Locally
1. Run `npm install` in project root.
2. Run `npm install` in `client` folder.
3. Create a `.env` file in project root to set `DATABASE_URL` (`mysql://` format), `PORT` for sever (recommend 4000) and `PUSHER_APP_ID`, `PUSHER_APP_KEY` and `PUSHER_APP_SECRET` keys obtained from your Pusher Channels account.
4. Set `{"proxy": "http://localhost:XXXX"}` in `client/package.json` to same port as your root directory `.env` server port
3. Create a `.env` file in the `client` folder and set `REACT_APP_PUSHER_APP_KEY` to the same key as your `PUSHER_APP_KEY` in the root folder `.env` file.
5. Run `npm run dev` to run both server and client in watch mode.

## Run Tests
1. Run `npm run test` in root directory to run server unit tests.
2. Run `npm run test` in `client` directory to run client unit tests.

## Known Issues

*	See [issues tab](https://github.com/llapresi/fastpoll/issues).
