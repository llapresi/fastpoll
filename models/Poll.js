module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Poll name cannot be empty' },
        len: { args: [1, 30], msg: 'Poll name max length is 30 characters' },
      },
      trim: true,
    },
    urlId: DataTypes.STRING,
    endtime: DataTypes.DATE,
  });

  return Poll;
};
