module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Poll name cannot be empty' },
        len: { args: [0, 60], msg: 'Poll name max length is 60 characters' },
      },
      trim: true,
    },
    urlId: DataTypes.STRING,
    endtime: DataTypes.DATE,
    isPublic: DataTypes.BOOLEAN,
  });

  Poll.associate = (PollOption) => {
    Poll.hasMany(PollOption);
  };

  return Poll;
};
