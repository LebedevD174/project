const router = require('express').Router();
const { Tweet, User, Like } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      include: [
        {
          model: User,
          as: 'tweetUser',
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          as: 'tweetLikes',
          attributes: ['id', 'user_id', 'tweet_id'],
        },
      ],
    });
    const response = { tweets };
    res.send(response);
  } catch ({ message }) {
    res.status(200).json({ error: message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'tweetUser',
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          as: 'tweetLikes',
          attributes: ['id', 'user_id', 'tweet_id'],
        },
      ],
    });
    const response = { tweet };
    res.send(response);
  } catch ({ message }) {
    res.status(200).json({ error: message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { img, content } = req.body;
    // const { user } = res.locals;
    if (content.trim() === '') {
      res.json({ message: 'Заполните Щебетание' });
    } else {
      const tweetCr = await Tweet.create({
        img,
        content,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const tweet = await Tweet.findOne({
        where: { id: tweetCr.id },
        include: [
          {
            model: User,
            as: 'tweetUser',
            attributes: ['id', 'name'],
          },
          {
            model: Like,
            as: 'tweetLikes',
            attributes: ['id', 'user_id', 'tweet_id'],
          },
        ],
      });
      const response = { tweet };
      res.json({ message: 'success', response });
    }
  } catch ({ message }) {
    console.log(message);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(123);
  try {
    const { id } = req.params;
    // const { user } = res.locals;
    const tweet = await Tweet.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'tweetUser',
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          as: 'tweetLikes',
          attributes: ['id', 'user_id', 'tweet_id'],
        },
      ],
    });
    // const areUsers = tweet.user_id === user.id;
    if (true) {
      await Tweet.destroy({
        where: { id },
        include: [
          {
            model: User,
            as: 'tweetUser',
            attributes: ['id', 'name'],
          },
          {
            model: Like,
            as: 'tweetLikes',
            attributes: ['id', 'user_id', 'tweet_id'],
          },
        ],
      });
      res.json({ message: 'success' });
    } else {
      res.json({ message: 'Щебет принадлежит другому пользователю' });
    }
  } catch ({ message }) {
    console.log(message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, img } = req.body;
    const { user } = res.locals;
    const tweet = await Tweet.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'tweetUser',
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          as: 'tweetLikes',
          attributes: ['id', 'user_id', 'tweet_id'],
        },
      ],
    });
    const areUsers = tweet.user_id === user.id;
    if (areUsers) {
      if (content.trim() === '') {
        res.json({ message: 'Заполните Щебетание' });
      } else {
        await Tweet.update({
          content, img, updatedAt: new Date(),
        }, { where: { id } });
        res.json({ message: 'success' });
      }
    } else {
      res.json({ message: 'Щебет принадлежит другому пользователю' });
    }
  } catch ({ message }) {
    console.log(message);
  }
});

router.post('/like:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const tweet = await Tweet.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'tweetUser',
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          as: 'tweetLikes',
          attributes: ['id', 'user_id', 'tweet_id'],
        },
      ],
    });
    const areUsers = tweet.user_id === user.id;
    if (areUsers) {
      res.json({ message: 'Это ваш щебет, вы не можете лайкнуть его"' });
    } else {
      const areLike = await Like.findOne({ where: { tweet_id: id, user_id: user.id } });
      if (!areLike) {
        const newLike = await Like.create({
          tweet_id: id, user_id: user.id, createdAt: new Date(), updatedAt: new Date(),
        });
        const likeCount = (await Like.findAll({ where: { tweet_id: id } })).length;
        res.json({ message: 'success', likeCount });
      } else {
        await Like.destroy({ where: { id: areLike.id } });
        const likeCount = (await Like.findAll({ where: { tweet_id: id } })).length;
        res.json({ message: 'success', likeCount });
      }
    }
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
