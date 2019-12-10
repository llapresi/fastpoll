const Sequelize = require('sequelize');

// Setup our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Poll = require('./Poll')(sequelize, Sequelize);
const PollOption = require('./PollOption')(sequelize, Sequelize);

Poll.hasMany(PollOption);

sequelize.sync();

module.exports.Poll = Poll;
module.exports.PollOption = PollOption;
