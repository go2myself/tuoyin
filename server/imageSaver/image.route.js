const express = require('express');
const imageCtrl = require('./image.controller');

const router = express.Router();
// NOTE: 这里必须加斜杠
router.route('/upload').post(imageCtrl.upload);
module.exports = router;
