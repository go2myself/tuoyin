const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const imagesRoutes = require('./server/imageSaver/image.route');
const articleRoutes = require('./server/article/article.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/user', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/image', imagesRoutes);
router.use('/article', articleRoutes);
module.exports = router;
