require('dotenv/config');
const jwt = require('jsonwebtoken');
// в конфиге можем настроить время жизни и название наших ключей
const jwtConfig = require('../config/jwtConfig');

const singUtils = (payload) => ({
  accessToken: jwt.sign(payload, process.env.TOKEN_ACCESS, {
    // здесь access и это восковый билет
    expiresIn: jwtConfig.access.expiresIn,
  }),

  refreshToken: jwt.sign(payload, process.env.TOKEN_REFRESH, {
    // здесь рефреш и это наш чек
    expiresIn: jwtConfig.refresh.expiresIn,
  }),
});

module.exports = singUtils;
