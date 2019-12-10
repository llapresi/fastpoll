module.exports = (sequelize, DataTypes) => {
    let PollOption = sequelize.define('PollOption', {
        name: DataTypes.STRING,
    });

    return PollOption
};

