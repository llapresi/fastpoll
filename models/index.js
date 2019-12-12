const Sequelize = require('sequelize');

// Setup our db
const sequelize = new Sequelize(process.env.DATABASE_URL);
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
module.exports.db = sequelize;
