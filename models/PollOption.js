module.exports = (sequelize, DataTypes) => {
    let PollOption = sequelize.define('PollOption', {
        name: DataTypes.STRING,
        votes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return PollOption
};

