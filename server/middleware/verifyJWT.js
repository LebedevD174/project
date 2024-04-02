const jwt = require('jsonwebtoken');
const signUtils = require('../utils/signUtils');

function verifyRefreshToken(req, res, next) {
  try {
    // достаем refresh токен
    const { refresh } = req.cookies;
    // проверяем refresh token по секретному слову
    const { user } = jwt.verify(refresh, process.env.TOKEN_REFRESH);
    // генерируем новую пару токенов
    const { accessToken, refreshToken } = signUtils({
      user: { id: user.id, name: user.name },
    });
    // дополняем объект ответа userом
    res.locals.user = user;
    // дополняем объект ответа новой парой токенов, положив их в куки
    res.cookie('refresh', refreshToken).cookie('access', accessToken);
    next();
  } catch (error) {
    // чистим куки refresha и accessa на клиенте
    res.clearCookie('access').clearCookie('refresh');
    next();
  }
}

function verifyAccessToken(req, res, next) {
  try {
    // достаем access куку из запроса
    const { access } = req.cookies;
    // проверяем по секретному слову доступ к access и достаем usera
    const { user } = jwt.verify(access, process.env.TOKEN_ACCESS);
    // дополняем объект ответа userом
    res.locals.user = user;
    next();
  } catch (error) {
    // пробуем проверить refresh токен
    verifyRefreshToken(req, res, next);
  }
}

module.exports = {verifyAccessToken};
