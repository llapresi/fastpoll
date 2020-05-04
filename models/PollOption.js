module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define('PollOption', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Option name cannot be empty' },
        len: { args: [0, 60], msg: 'Option name max length is 60 characters' },
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
