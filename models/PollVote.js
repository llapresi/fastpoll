module.exports = (sequelize, DataTypes) => {
    let PollVote = sequelize.define('PollVote', {
        voter: DataTypes.STRING,
    });
    
    return PollVote;
};