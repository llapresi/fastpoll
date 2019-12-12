# Fastpoll

Fastpoll is a web app that allows users to create realtime polls. Fastpoll utilizes

* A React based frontend that allows users to create polls and vote on them. Voting updates in realtime via. short polling, allowing you to see incoming results. Developed using [Create React App](https://github.com/facebook/create-react-app), [React Router](https://reacttraining.com/react-router/), React Hooks and [Emotion styling](https://github.com/emotion-js/emotion)
* Client unit testing using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library)
* A backend service that implements a REST API for creating polls, retrieving them and voting on them, using [Express](https://expressjs.com/) for routing + REST requests and [Sequelize](https://sequelize.org/) as an ORM