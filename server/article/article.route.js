const express = require('express');
const articleCtrl = require('./article.controller');

const router = express.Router();
// router.get('/list')
router.route('/list').get(articleCtrl.list);
router.route('/upload').post(articleCtrl.upload);
router.route('/:articleId')
  .get(articleCtrl.getDetail)
  .put(articleCtrl.update)
  .delete(articleCtrl.remove);
router.route('/loadHtml/:articleId').get(articleCtrl.getHTML);
router.param('articleId', articleCtrl.loadParam);
module.exports = router;
