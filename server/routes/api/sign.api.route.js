const router = require('express').Router();
const bcrypt = require('bcrypt');
const signUtils = require('../../utils/signUtils');
const jwtConfig = require('../../config/jwtConfig');
const { User } = require('../../db/models');

router.post('/in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (email.trim() === '' || password.trim() === '') {
      res.json({ message: 'Заполните поля корректно' });
      return;
    }
    if (email.trim().length !== email.length || email.replace(' ', '').length !== email.length) {
      res.json({ message: 'E-mail не должен содержать пробелов' });
      return;
    }
    if (password.trim().length !== password.length || password.replace(' ', '').length !== password.length) {
      res.json({ message: 'Пароль не должен содержать пробелов' });
      return;
    }
    if (!user) {
      res.json({ message: 'Такого пользователя не существует' });
      return;
    }
    const passTest = await bcrypt.compare(password, user.password);
    if (!passTest) {
      res.json({ message: 'Пароль не совпадает' });
    } else {
      res.locals.user = user;

      const { accessToken, refreshToken } = signUtils({
        user: {
          id: user.id, email: user.email, name: user.name, role: user.role,
        },
      });

      res
        .cookie(jwtConfig.refresh.type, refreshToken, {
          maxAge: jwtConfig.refresh.expiresIn,
          httpOnly: true,
        })
        .cookie(jwtConfig.access.type, accessToken, {
          maxAge: jwtConfig.access.expiresIn,
          httpOnly: true,
        });

      res.json({ message: 'success' });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/up', async (req, res) => {
  try {
    const {
      email, password, r_password, name,
    } = req.body;
    const user = await User.findOne({ where: { email } });
    if (email.trim() === '' || password.trim() === '') {
      res.json({ message: 'Заполните поля корректно' });
      return;
    }
    if (email.trim().length !== email.length || email.replace(' ', '').length !== email.length) {
      res.json({ message: 'E-mail не должен содержать пробелов' });
      return;
    }
    if (password.trim().length !== password.length || password.replace(' ', '').length !== password.length || r_password.trim().length !== r_password.length || r_password.replace(' ', '').length !== r_password.length) {
      res.json({ message: 'Пароль или повтор пароля не должен содержать пробелов' });
      return;
    }
    if (user) {
      res.json({ message: 'Такой e-mail занят' });
      return;
    }
    if (password !== r_password) {
      res.json({ message: 'Пароль не совпадает' });
    } else {
      const newUser = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.locals.user = newUser;

      const { accessToken, refreshToken } = signUtils({
        user: {
          id: newUser.id, email: newUser.email, name: newUser.name,
        },
      });

      res
        .cookie(jwtConfig.refresh.type, refreshToken, {
          maxAge: jwtConfig.refresh.expiresIn,
          httpOnly: true,
        })
        .cookie(jwtConfig.access.type, accessToken, {
          maxAge: jwtConfig.access.expiresIn,
          httpOnly: true,
        });

      res.json({ message: 'success' });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/out', async (req, res) => {
  try {
    res
      .clearCookie(jwtConfig.access.type)
      .clearCookie(jwtConfig.refresh.type);
    res.redirect('/');
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
