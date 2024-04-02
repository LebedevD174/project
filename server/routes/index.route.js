const router = require('express').Router();

const apiSignRoute = require('./api/sign.api.route');
const apiTweetRoute = require('./api/tweet.api.router');


// const mainRoute = require('./view/main.route');
// const signRoute = require('./view/sign.route');
// const tweetRoute = require('./view/tweet.route');
// const errRoute = require('./view/err.route');

// router.use('/', mainRoute);
// router.use('/sign', signRoute);
// router.use('/tweet', tweetRoute);

router.use('/api/sign', apiSignRoute);
router.use('/api/tweets', apiTweetRoute);
// router.use('*', errRoute)

module.exports = router;
