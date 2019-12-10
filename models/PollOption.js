module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define('PollOption', {
    name: DataTypes.STRING,
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return PollOption;
};
