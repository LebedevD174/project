const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    static associate({ User, Like }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'tweetUser' });
      this.hasMany(Like, { foreignKey: 'tweet_id', as: 'tweetLikes' });
    }
  }
  Tweet.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    img: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};
