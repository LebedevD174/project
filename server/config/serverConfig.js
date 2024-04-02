const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const getUser = require('../middleware/getUser');
const {verifyAccessToken} = require('../middleware/verifyJWT');

const serverConfig = (app) => {
  // читать данные из тела запросов
  app.use(express.urlencoded({ extended: true }));
  // читать JSON-данные из тела запросов
  app.use(express.json());
  // подключаем статику
  app.use(express.static(path.join(__dirname, '..', 'public')));
  // для пользователя
  app.use(getUser);
  // нужен для чтение кук на сервере
  app.use(cookieParser());
  // проверяет токены
  app.use(verifyAccessToken);
};

module.exports = serverConfig;
