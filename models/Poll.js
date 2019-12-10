module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    name: DataTypes.STRING,
    urlId: DataTypes.STRING,
    endtime: DataTypes.DATE,
  });

  return Poll;
};
