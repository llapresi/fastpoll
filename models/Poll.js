module.exports = (sequelize, DataTypes) => {
    var Poll = sequelize.define('Poll', {
        name: DataTypes.STRING,
        urlId: DataTypes.STRING,
        endtime: DataTypes.DATE
    });

    return Poll;
};