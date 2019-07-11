const Article = require('./article.model');
const APIHelper = require('../helpers/');

const { ok } = APIHelper.APIResTemplate;

exports.list = (req, res, next) => {
  Article.list().then(result => res.json(ok(result))).catch(error => next(error));
};
// 对于参数进行预处理,把查询到的article添加到req中
exports.loadParam = (req, res, next, id) => {
  Article.findById(id).select().exec()
    .then((article) => {
      req.article = article;
      // 这里如果不加next无法继续
      return next();
    })
    .catch(err => next(err));
};
// 上传操作
exports.upload = (req, res, next) => {
  const { title, content } = req.body;
  const article = new Article({ title, content });
  article.save().then(() => res.json(ok('文章上传成功'))).catch(err => next(err));
};
// 更新
exports.update = (req, res, next) => {
  const { article } = req;
  const { title, content } = req.body;
  article.title = title;
  article.content = content;
  article.save().then(() => res.json(ok('修改成功'))).catch(err => next(err));
};
// 删除
exports.remove = (req, res, next) => {
  const { article } = req;
  article.delete().then(() => res.json(ok('删除成功'))).catch(err => next(err));
};
// 获取某篇文章详情
// eslint-disable-next-line no-unused-vars
exports.getDetail = (req, res, next) => {
  const { article } = req;
  if (article) {
    res.json(ok(article));
  } else {
    next(new Error('未查到该文章'));
  }
};
