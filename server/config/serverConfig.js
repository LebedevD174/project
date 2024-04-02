const path = require('path');
const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser');
const getUser = require('../middleware/getUser');
const {verifyAccessToken} = require('../middleware/verifyJWT');

const serverConfig = (app) => {
  app.use(cors({origin: 'http://localhost:5173'}))
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
