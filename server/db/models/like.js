const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tweet }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'likeUsers' });
      this.belongsTo(Tweet, { foreignKey: 'tweet_id', as: 'likeTweets' });
    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    tweet_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
