module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define('PollOption', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Option name cannot be empty' },
        len: { args: [1, 30], msg: 'Option name max length is 30 characters' },
      },
      trim: true,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return PollOption;
};
